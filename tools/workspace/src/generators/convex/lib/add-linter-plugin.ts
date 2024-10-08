import { GeneratorCallback, Tree, addDependenciesToPackageJson } from '@nx/devkit';

import { hasNxPackage, readNxVersion } from './utils';

export function addLinterPlugin(tree: Tree): GeneratorCallback {
  const hasNrwlLinterDependency: boolean = hasNxPackage(tree, '@nx/eslint');

  if (!hasNrwlLinterDependency) {
    const nxVersion = readNxVersion(tree);

    return addDependenciesToPackageJson(tree, {}, { '@nx/eslint': nxVersion });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }
}
