import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  runTasksInSerial,
  Tree,
  updateJson,
  updateProjectConfiguration,
  writeJson,
} from '@nx/devkit';
import * as path from 'path';
import { execSync } from 'child_process';
import { ArrayLiteralExpression } from 'typescript';
import { libraryGenerator } from '@nx/js';
import { Linter, lintProjectGenerator } from '@nx/eslint';
import { vitestGenerator } from '@nx/vite';
import { tsquery } from '@phenomnomnominal/tsquery';

import { addVitestPlugin } from './lib/add-vitest-plugin';
import { addLinterPlugin } from './lib/add-linter-plugin';
import { ConvexGeneratorSchema } from './schema';

import { convexTestVersion, convexVersion, edgeRuntimeVM } from '../../utils/versions';

interface NormalizedSchema extends ConvexGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(tree: Tree, options: ConvexGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : ['type:convex', 'domain:server'];

  return { ...options, projectName, projectRoot, projectDirectory, parsedTags };
}

function addDependencies(tree: Tree) {
  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {
    convex: convexVersion,
    'convex-test': convexTestVersion,
    '@edge-runtime/vm': edgeRuntimeVM,
  };

  return addDependenciesToPackageJson(tree, dependencies, devDependencies);
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

function updateEslintJson(tree: Tree, options: NormalizedSchema) {
  updateJson(tree, path.join(options.projectRoot, '.eslintrc.json'), (eslintJson) => {
    eslintJson.ignorePatterns = [
      ...eslintJson.ignorePatterns,
      'convex/_generated/**/*',
      'vite.config.ts',
      'tsconfig.json',
    ];

    eslintJson.overrides[0].rules = {
      ...eslintJson.overrides[0].rules,
      'no-process-env': 'off',
    };

    return eslintJson;
  });
}

function updateTsConfigs(tree: Tree, options: NormalizedSchema) {
  updateJson(tree, path.join(options.projectRoot, 'tsconfig.json'), (tsConfigJson) => {
    const tsConfigExcludes = tsConfigJson.exclude ?? [];

    tsConfigJson.compilerOptions.module = 'ESNext';
    tsConfigJson.exclude = [...tsConfigExcludes, './convex/_generated/**/*'];

    return tsConfigJson;
  });

  updateJson(tree, path.join(options.projectRoot, 'tsconfig.lib.json'), (tsConfigJson) => {
    const tsConfigIncludes = tsConfigJson.include ?? [];
    const tsConfigExcludes = tsConfigJson.exclude ?? [];
    const includes = [...tsConfigIncludes].join('==>').replace(/src/gi, 'convex').split('==>');
    const excludes = [...tsConfigExcludes].join('==>').replace(/src/gi, 'convex').split('==>');

    tsConfigJson.include = Array.from(new Set([...tsConfigIncludes, ...includes]));
    tsConfigJson.exclude = Array.from(new Set([...tsConfigExcludes, ...excludes]));

    return tsConfigJson;
  });

  updateJson(tree, path.join(options.projectRoot, 'tsconfig.spec.json'), (tsConfigJson) => {
    const tsConfigIncludes = tsConfigJson.include ?? [];
    const includes = [...tsConfigIncludes].join('==>').replace(/src/gi, 'convex').split('==>');

    tsConfigJson.include = Array.from(new Set([...tsConfigIncludes, ...includes]));

    return tsConfigJson;
  });
}

function updateConvexJson(tree: Tree, options: NormalizedSchema) {
  writeJson(tree, 'convex.json', {
    functions: `${options.projectRoot}/convex`,
  });
}

function updateViteConfig(tree: Tree, options: NormalizedSchema) {
  const filePath = path.join(options.projectRoot, 'vite.config.ts');
  const fileEntry = tree.read(filePath);
  const contents = fileEntry?.toString() ?? '';

  let newContents = tsquery.replace(contents, 'ArrayLiteralExpression', (node) => {
    const trNode = node as ArrayLiteralExpression;

    if (trNode.getText() === "['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']") {
      return trNode.getText().replace(/src/gi, '{src,convex}');
    }

    return null;
  });

  newContents = newContents.replace(
    /environment: 'edge-runtime',/gi,
    "environment: 'edge-runtime',\n\tserver: { deps: { inline: ['convex-test'] } },",
  );

  newContents = newContents.replace(
    /reporters: \['default'\],/gi,
    "reporters: process.env['GITHUB_ACTIONS'] ? ['verbose', 'github-actions'] : ['verbose'],",
  );

  // only write the file if something has changed
  if (newContents !== contents) tree.write(filePath, newContents);
}

function initialiseConvex() {
  const result = execSync('npx convex codegen', { stdio: 'inherit' });

  return result;
}

export async function convexGenerator(tree: Tree, options: ConvexGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    name: normalizedOptions.projectName,
    compiler: 'tsc',
    unitTestRunner: 'vitest',
    projectNameAndRootFormat: 'as-provided',
    directory: normalizedOptions.projectRoot,
    setParserOptionsProject: true,
    linter: 'eslint',
    strict: true,
    tags: 'type:convex,domain:server',
  });

  const projectConfiguration = readProjectConfiguration(tree, options.name);

  delete projectConfiguration.targets?.build;

  updateProjectConfiguration(tree, normalizedOptions.projectName, {
    root: projectConfiguration.root,
    targets: {
      ...projectConfiguration.targets,
      dev: {
        executor: 'nx:run-commands',
        options: {
          command: 'convex dev',
        },
      },
    },
  });

  addFiles(tree, normalizedOptions);

  tasks.push(await addVitestPlugin(tree));
  tasks.push(addLinterPlugin(tree));
  tasks.push(addDependencies(tree));

  await lintProjectGenerator(tree, {
    project: normalizedOptions.projectName,
    skipFormat: true,
    linter: Linter.EsLint,
  });

  await vitestGenerator(tree, {
    project: normalizedOptions.projectName,
    coverageProvider: 'v8',
    uiFramework: 'none',
    testEnvironment: 'edge-runtime',
  });

  updateEslintJson(tree, normalizedOptions);
  updateConvexJson(tree, normalizedOptions);
  updateTsConfigs(tree, normalizedOptions);
  updateViteConfig(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    runTasksInSerial(...tasks);
    initialiseConvex();
  };
}

export default convexGenerator;
