"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
var graphql_1 = require("graphql");
var fs = require("fs-extra");
var typeDefs = fs.readFileSync(__dirname + '/cluster.graphql', 'utf-8');
var schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs });
graphql_tools_1.addMockFunctionsToSchema({
    schema: schema,
    mocks: {
        Migration: function () { return ({
            revision: 5,
        }); },
    },
});
exports.MockGraphQLClient = function () {
    return {
        request: function (query, variables) {
            return graphql_1.graphql(schema, query, {}, {}, variables);
        },
    };
};
//# sourceMappingURL=mock-client.js.map