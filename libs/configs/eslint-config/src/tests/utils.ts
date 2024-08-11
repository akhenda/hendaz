import { execSync } from 'child_process';
import { resolve } from 'path';

export function configFile(name: string) {
  return resolve(__dirname, '..', 'lib', 'configs', `${name}.js`);
}

export function execESLint(args: string) {
  try {
    return execSync(`eslint --ignore-pattern="**/eslint.config.js" ${args}`).toString();
  } catch (error) {
    if ((error as { stdout: string[] }).stdout) return (error as { stdout: string[] }).stdout.toString();

    throw error;
  }
}

export function fixtureFile(fixture: string) {
  return resolve(__dirname, 'fixtures', fixture);
}
