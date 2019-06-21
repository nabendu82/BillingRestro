# graphql-config-extension-openapi

[![CircleCI](https://circleci.com/gh/graphql-config/graphql-config-extension-openapi.svg?style=shield)](https://circleci.com/gh/graphql-config/graphql-config-extension-openapi) [![npm version](https://badge.fury.io/js/graphql-config-extension-openapi.svg)](https://badge.fury.io/js/graphql-config-extension-openapi)

Injects endpoints into a GraphQL Config instance based on a given OpenAPI definition to retrieve the schema.

## Usage in `.graphqlconfig.yml`
```yml
projects:
  petstore:
    extensions:
      openapi: 
        definition: petstore.json
```

## Usage in Node.js

```ts
import {patchEndpointsToConfig} from 'graphql-config-extension-openapi'
import {getGraphQLConfig, GraphQLConfigData} from 'graphql-config'

const config: GraphQLConfigData = getGraphQLConfig().config
const patchedConfig: GraphQLConfigData = patchEndpointsToConfig(config, process.cwd())
```

## Current Usages
This is currently being used in [graphql-cli](https://github.com/graphql-cli/graphql-cli) to provide `get-schema` functionality for OpenAPI endpoints.
