"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const errors_1 = require("./errors");
function validateQueryDocument(schema, document) {
    const specifiedRulesToBeRemoved = [graphql_1.NoUnusedFragmentsRule, graphql_1.KnownDirectivesRule];
    const rules = [
        NoAnonymousQueries,
        NoTypenameAlias,
        ...graphql_1.specifiedRules.filter(rule => !specifiedRulesToBeRemoved.includes(rule))
    ];
    const validationErrors = graphql_1.validate(schema, document, rules);
    if (validationErrors && validationErrors.length > 0) {
        for (const error of validationErrors) {
            errors_1.logError(error);
        }
        throw new errors_1.ToolError('Validation of GraphQL query document failed');
    }
}
exports.validateQueryDocument = validateQueryDocument;
function NoAnonymousQueries(context) {
    return {
        OperationDefinition(node) {
            if (!node.name) {
                context.reportError(new graphql_1.GraphQLError('Apollo does not support anonymous operations', [node]));
            }
            return false;
        }
    };
}
exports.NoAnonymousQueries = NoAnonymousQueries;
function NoTypenameAlias(context) {
    return {
        Field(node) {
            const aliasName = node.alias && node.alias.value;
            if (aliasName == '__typename') {
                context.reportError(new graphql_1.GraphQLError('Apollo needs to be able to insert __typename when needed, please do not use it as an alias', [node]));
            }
        }
    };
}
exports.NoTypenameAlias = NoTypenameAlias;
//# sourceMappingURL=validation.js.map