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
  updateProjectConfiguration,
} from '@nx/devkit';
import * as path from 'path';
import { ConvexGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/js';
import { Linter, lintProjectGenerator } from '@nx/eslint';
import { convexTestVersion, edgeRuntimeVM } from '../../utils/versions';
import { addVitestPlugin } from './lib/add-vitest-plugin';
import { vitestGenerator } from '@nx/vite';
import { addLinterPlugin } from './lib/add-linter-plugin';

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
    project: options.name,
    skipFormat: true,
    linter: Linter.EsLint,
  });

  await vitestGenerator(tree, {
    project: normalizedOptions.name,
    coverageProvider: 'v8',
    uiFramework: 'none',
    testEnvironment: 'edge-runtime',
  });

  await formatFiles(tree);
  return runTasksInSerial(...tasks);

  // return () => {
  //   installPackagesTask(tree);
  // };
}

export default convexGenerator;
