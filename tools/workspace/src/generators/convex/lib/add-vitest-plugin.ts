import { GeneratorCallback, Tree, addDependenciesToPackageJson } from '@nx/devkit';
import { initGenerator } from '@nx/vite';

import { hasNxPackage, readNxVersion } from './utils';

export async function addVitestPlugin(tree: Tree) {
  const tasks: GeneratorCallback[] = [];
  const hasNrwlVitestDependency: boolean = hasNxPackage(tree, '@nx/vite');

  if (!hasNrwlVitestDependency) {
    const nxVersion = readNxVersion(tree);
    const installTask = addDependenciesToPackageJson(tree, {}, { '@nx/vite': nxVersion });

    tasks.push(installTask);
  }

  return initGenerator(tree, {});
}
