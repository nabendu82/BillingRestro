# graphql-config-extension-prisma

[![CircleCI](https://circleci.com/gh/graphcool/graphql-config-extension-prisma.svg?style=shield)](https://circleci.com/gh/graphcool/graphql-config-extension-prisma) [![npm version](https://badge.fury.io/js/graphql-config-extension-prisma.svg)](https://badge.fury.io/js/graphql-config-extension-prisma)

Injects endpoints and headers into a GraphQL Config instance based on a given prisma.yml

## Usage in `.graphqlconfig.yml`

```yml
projects:
  database:
    extensions:
      prisma: prisma.yml
```

## Usage in Node.js

```ts
import { patchEndpointsToConfig } from 'graphql-config-extension-prisma'
import { getGraphQLConfig, GraphQLConfigData } from 'graphql-config'

const config: GraphQLConfigData = getGraphQLConfig().config
const patchedConfig: GraphQLConfigData = patchEndpointsToConfig(
  config,
  process.cwd(),
)
```

## Current Usages

This is currently being used in the [graphql-playground-html](https://github.com/graphcool/graphql-playground/tree/master/packages/graphql-playground-html) and [graphql-playgorund-electron](https://github.com/graphcool/graphql-playground/tree/master/packages/graphql-playground-electron).
