# graphql-config-extension-graphcool

[![CircleCI](https://circleci.com/gh/graphcool/graphql-config-extension-graphcool.svg?style=shield)](https://circleci.com/gh/graphcool/graphql-config-extension-graphcool) [![npm version](https://badge.fury.io/js/graphql-config-extension-graphcool.svg)](https://badge.fury.io/js/graphql-config-extension-graphcool)

Injects endpoints and headers into a GraphQL Config instance based on a given graphcool.yml

## Usage in `.graphqlconfig.yml`
```yml
projects:
  database:
    extensions:
      graphcool: graphcool.yml
```

## Usage in Node.js

```ts
import {patchEndpointsToConfig} from 'graphql-config-extension-graphcool'
import {getGraphQLConfig, GraphQLConfigData} from 'graphql-config'

const config: GraphQLConfigData = getGraphQLConfig().config
const patchedConfig: GraphQLConfigData = patchEndpointsToConfig(config, process.cwd())
```

## Current Usages
This is currently being used in the [graphql-playground-html](https://github.com/graphcool/graphql-playground/tree/master/packages/graphql-playground-html) and [graphql-playground-electron](https://github.com/graphcool/graphql-playground/tree/master/packages/graphql-playground-electron).

