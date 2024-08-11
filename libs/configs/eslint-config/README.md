# eslint-config

This library was generated with [Nx](https://nx.dev).

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE.md) [![npm version](https://badge.fury.io/js/%40hendaz%2Feslint-config.svg)](https://badge.fury.io/js/%40hendaz%2Feslint-config.svg) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@hendaz/eslint-config.svg)](https://img.shields.io/bundlephobia/minzip/@hendaz/eslint-config.svg)

ESLint configs.

## Installation

You'll first need to install [ESLint](http://eslint.org):

**With PNPM**

```bash
pnpm add -D eslint
```

**With Yarn**

```bash
yarn add --dev eslint
```

**With npm**

```bash
npm i eslint --save-dev
```

Next, install `@hendaz/eslint-config`:

**With PNPM**

```bash
pnpm add -D @hendaz/eslint-config
```

**With Yarn**

```bash
yarn add --dev @hendaz/eslint-config
```

**With npm**

```bash
npm install @hendaz/eslint-config --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@hendaz/eslint-config` globally.

## Usage

This package uses Eslint's "Flat Config" format, not the legacy "eslintrc" format. To upgrade your Eslint configuration, follow the [Configuration Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide).

---

hendaz’s ESLint configs come bundled in this package. In order to use them, you include the relevant configurations in your project’s `eslint.config.js`. For example, the following will use the ESNext (ES2015 and later) config:

```js
import eslintConfigs from '@shopify/eslint-plugin';

export default [...eslintConfigs.configs.esnext];
```

If you are working on an ES5 project, use the ES5 version of the configuration:

```js
import eslintConfigs from '@shopify/eslint-plugin';

export default [...eslintConfigs.configs.es5];
```

You can also add some "augmenting" configs on top of the "core" config by using an array of linting configs. For example, the following configuration would provide a base ESNext config that is augmented by a React config:

```js
import eslintConfigs from '@shopify/eslint-plugin';

export default [...eslintConfigs.configs.esnext, ...eslintConfigs.configs.react];
```

Likewise, if you are using TypeScript and React, the following configuration uses the TypeScript base config with the React-specific rules provided by the React configuration file. To demonstrate multiple augmentations, we've also added the Prettier config, which disables rules that will conflict in projects using prettier.

```js
import eslintConfigs from '@shopify/eslint-plugin';

export default [...eslintConfigs.configs.typescript, ...eslintConfigs.configs.react, ...eslintConfigs.configs.prettier];
```

## Provided configurations

This plugin provides the following core configurations:

- [esnext](lib/config/esnext.js): Use this for anything written with ES2015+ features.
- [typescript](lib/config/typescript.js): Use this for Typescript projects. The rules enabled in this config do not require type-checking to run. To enable all Typescript rules, you must augment this config with the `typescript-type-checking` config mentioned below.
- [es5](lib/config/es5.js): Use this for legacy projects.

This plugin also provides the following tool-specific configurations, which can be used on top of the core configurations:

- [typescript-type-checking](lib/config/typescript-type-checking.js) Use this config to augment the `typescript` config to enable all TypeScript rules, including those that require type checking. These rules are slower to run and and you will need to specify a path to your tsconfig.json file in the "project" property of "parserOptions". The following example would provide all of the TypeScript rules, assuming the tsconfig.json is in the same directory as you ESlint configuration.

```js
import eslintConfigs from '@shopify/eslint-plugin';

export default [
  ...eslintConfigs.configs.typescript,
  ...eslintConfigs.configs['typescript-type-checking'],
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  },
];
```

- [react](lib/config/react.js): Use this for React projects.
- [prettier](lib/config/prettier.js): Use [prettier](https://github.com/prettier/prettier) for consistent formatting. Extending this hendaz's prettier config will [override](https://github.com/prettier/eslint-config-prettier/blob/master/index.js) the default hendaz eslint rules in favor of prettier formatting. Prettier must be installed within your project, as @hendaz/eslint-config does not provide the dependency itself.
- [webpack](lib/config/webpack.js): Use this for projects built by [webpack](https://webpack.js.org/).

### Recipes

Here are some composed configs depending on the project:

- [basic](lib/config/recipes/basic.js): Use this for casual js/typescript projects.
- [nodest](lib/config/recipes/nodest.js): Use this for Node.js projects.
- [reactful](lib/config/recipes/reactful.js): Use this for React.js projects.
- [next](lib/config/recipes/next.js): Use this for Next.js projects.
- [react-native](lib/config/recipes/native.js): Use this for React Native or Expo projects.

### node

If you are working on a node module, we also provide the [node configuration](lib/config/node.js) for you. Note that this configuration needs to be used in conjunction with one of the core configurations (either `es5` or `esnext`). If you plan to transpile your code using Babel, use the `esnext` config. If you do not plan to do so, the config you choose depends on the version of node you wish to support, and how many ESNext features are natively available in that version. You can see a detailed list of what version of node supports what new JavaScript features by visiting <http://node.green>.

A node project that will use Babel for transpilation would need the following ESLint config:

```js
import eslintConfigs from '@shopify/eslint-plugin';

export default [...eslintConfigs.configs.esnext, ...eslintConfigs.configs.node];
```

### Supported Typescript version

The supported version of TypeScript is constrained by the [@typescipt-eslint parser support](https://github.com/typescript-eslint/typescript-eslint#supported-typescript-version) that is installed.

## Suggested additional configs

For applications that use graphql we recommend using the `operations-recommended` preset from [`@graphql-eslint/eslint-config`](https://github.com/B2o5T/graphql-eslint). This is not included as part of this plugin because graphql has a large install footprint and not everybody needs it.

## Building

Run `nx build eslint-config` to build the library.

## Running unit tests

Run `nx test eslint-config` to execute the unit tests via [Jest](https://jestjs.io).
