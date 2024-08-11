# ts

This library was generated with [Nx](https://nx.dev).

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE.md) [![npm version](https://badge.fury.io/js/%40hendaz%2Fts.svg)](https://badge.fury.io/js/%40hendaz%2Fts.svg) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@hendaz/ts.svg)](https://img.shields.io/bundlephobia/minzip/@hendaz/ts.svg)

In TypeScript, the configuration file can extend from a base file. This package provided a few common base configuration files to simplify TypeScript project setup.

To read more about how this extensibility works. See [typescript handbook](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#configuration-inheritance-with-extends).

Below are two documentation we have also found useful to have on hand while setting up a configuration file.

- [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## Installation

```bash
pnpm add -D @hendaz/ts
```

## Usage

### React Application Project

To start, create a `tsconfig.json` in the root of your project.

A typical setup where the application sit in `[project root]/app` folder is as follow:

```json
{
  "extends": "@hendaz/ts/app.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": { "*": ["*", "app/*"] }
  },
  "include": ["./app/**/*", "./client/**/*", "./server/**/*", "./tests/**/*"]
}
```

#### React Library Project

Similarly for a react library project. Create a `tsconfig.json` in the root of your project with a setup below assuming the library code sit in `[project root]/src` folder.

```json
{
  "extends": "@hendaz/ts/library.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "rootDir": "."
  },
  "include": ["./src/**/*"]
}
```

#### Project that run in the browser

A configuration file is provided that included styles setup and a more conservative build target.

```json
{
  "extends": "@hendaz/ts/dom.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  }
}
```

#### All Other Project

A base configuration file is also provided if the above does not fit your need.

```json
{
  "extends": "@hendaz/ts/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  }
}
```

#### Common Got Ya

##### Type Checking does not honour `skipLibCheck: true` setting

There are times when the type failure occur inside of a library your project is consuming, and having `skipLibCheck: true` does not resolved it. In this scenario, add an `exclude` option to your `tsconfig.json`.

eg.

```json
{
  "extends": "@hendaz/ts/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "exclude": ["./node_modules/**/*"]
  }
}
```

## Building

Run `nx build ts` to build the library.

## Running unit tests

Run `nx test ts` to execute the unit tests via [Jest](https://jestjs.io).
