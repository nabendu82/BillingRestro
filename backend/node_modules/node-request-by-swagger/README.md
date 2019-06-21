# Request by Swagger

The library constructs [request](https://github.com/request/request) options object, based on Swagger schema endpoint.

## Objectives

Using REST one has to deal with many delivering data options: GET query, headers, body json, body multipart.
All of these options can be described using Swagger schema [parameters section](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameterObject).
This library is an attempt to separate request logic from HTTP implementation details.
So you can consider you endpoint as a function, that takes some arguments

## Install

```
npm i --save node-request-by-swagger
```

## Usage

```
const getRequestOptions = require('node-request-by-swagger');
const options = getRequestOptions(schema['/pet'].post, {
    method: 'post',
    baseUrl: `http://${schema.host}${schema.basePath}`,
    path: '/pet',
    args: {
        body: {
            name: 'bob'
        }
    },
});

```