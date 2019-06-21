# graphql-cli-prepare [![npm](https://img.shields.io/npm/v/graphql-cli-prepare.svg?style=flat-square)](https://www.npmjs.com/package/graphql-cli-prepare)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)[![CircleCI](https://img.shields.io/circleci/project/github/supergraphql/graphql-cli-prepare.svg?style=flat-square)](https://circleci.com/gh/supergraphql/graphql-cli-prepare)[![Greenkeeper badge](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square)](https://renovateapp.com/)[![Code Climate](https://img.shields.io/codeclimate/maintainability/supergraphql/graphql-cli-prepare.svg?style=flat-square)](https://codeclimate.com/github/supergraphql/graphql-cli-prepare)   
Plugin for [`graphql-cli`](https://github.com/graphql-cli/graphql-cli) to bundle schemas using [`graphql-import`](https://github.com/graphcool/graphql-import) and generate bindings using [`graphql-static-binding`](https://github.com/supergraphql/graphql-static-binding).

## Installation

The `graphql-cli-prepare` plugin is shipped with `graphql-cli`.

## Usage
```
graphql prepare

Bundle schemas and generate bindings

Options:
  --dotenv         Path to .env file                                    [string]
  -p, --project    Project name                                         [string]
  --output, -o     Output folder                                        [string]
  --save, -s       Save settings to config file     [boolean] [default: "false"]
  --bundle         Process schema imports           [boolean] [default: "false"]
  --bindings       Generate bindings                [boolean] [default: "false"]
  --generator, -g  Generator used to generate bindings                  [string]
  --verbose        Show verbose output messages     [boolean] [default: "false"]
  -h, --help       Show help                                           [boolean]
  -v, --version    Show version number                                 [boolean]
```

### Schema bundling
Schema bundling is the processing of `import` statements in a GraphQL schema. For more information, see [`graphql-import`](https://github.com/graphcool/graphql-import).  
The first time you use schema bundling on a project, you need to provide the output folder where the processed schema will be stored:
```shell
$ graphql prepare -p app -o src/generated --bundle --save
√ Bundled schema for project app written to src/generated/app.graphql
```
This will also save the configuration in your `.graphqlconfig` file (see below).

### Binding generation
Binding generation is a code generation process. A binding file will be generated for use with [`graphql-yoga`](https://github.com/graphcool/graphql-yoga/). This binding provides type safe delegation of GraphQL queries and mutations in your resolvers. See [`graphcool-binding`](https://github.com/graphcool/graphcool-binding) for more information.  
The first time you use binding generation in your project, you need to provide an output folder for your generated binding files, and the generator you want to use:
```shell
$ graphql prepare -p database -o src/generated -g graphcool-ts --bindings --save
√ Bindings for project database written to src/generated/database.ts
```
This will also save the configuration in your `.graphqlconfig` file (see below).

### Automating `graphql prepare`
After you have set up bundling and binding generation for all projects, you can simply run `graphql prepare` without any parameters to process all projects:
```shell
$ graphql prepare
√ Bundled schema for project app written to src/generated/app.graphql
√ Bindings for project database written to src/generated/database.ts
```
## Advanced topics

### Available generators
Out of the box, the following generators are provided by [`graphql-static-binding`](https://github.com/supergraphql/graphql-static-binding):

| Generator    | Purpose                                      |
| ------------ | -------------------------------------------- |
| graphcool-ts | Typescript bindings for Graphcool endpoints  |
| graphcool-js | Javascript bindings for Graphcool endpoints  |
| binding-ts   | Typescript bindings for any GraphQL endpoint |
| binding-js   | Javascript bindings for any GraphQL endpoint |

### Using your own generator
You can also use your own generator. To do so, you can pass a file path to the `--generator` parameter:
```shell
$ graphql prepare -p database --bindings -g ./myGenerator.js
```
>More instructions for creating your own generator are coming soon in [`graphql-static-binding`](https://github.com/supergraphql/graphql-static-binding).

### `graphql-config` extensions

To store the project configuration for bundling and bindings, `graphql-cli-prepare` uses two extension keys in the `graphql-config` configuration file. These keys can be set manually, or using the `--save` parameter.
```diff
# ./.graphqlconfig.yml
projects:
  app:
    schemaPath: src/schema.graphql
    extensions:
      endpoints:
        default: 'http://localhost:4000'
+       prepare-bundle: src/generated/app.graphql
  database:
    schemaPath: database/schema.generated.graphql
    extensions:
      graphcool: graphcool.yml
+     prepare-binding:
+       output: src/generated/database.ts
+       generator: graphcool-ts

```

<hr>
<p align="center">
  <img src="https://img.shields.io/badge/built-with_love-blue.svg?style=for-the-badge"/><a href="https://github.com/kbrandwijk" target="-_blank"><img src="https://img.shields.io/badge/by-kim_brandwijk-blue.svg?style=for-the-badge"/></a>
</p>

