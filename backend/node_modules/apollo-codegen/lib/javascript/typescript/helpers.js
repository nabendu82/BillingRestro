"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const t = require("@babel/types");
const builtInScalarMap = {
    [graphql_1.GraphQLString.name]: t.TSStringKeyword(),
    [graphql_1.GraphQLInt.name]: t.TSNumberKeyword(),
    [graphql_1.GraphQLFloat.name]: t.TSNumberKeyword(),
    [graphql_1.GraphQLBoolean.name]: t.TSBooleanKeyword(),
    [graphql_1.GraphQLID.name]: t.TSStringKeyword(),
};
function createTypeFromGraphQLTypeFunction(compilerOptions) {
    function nonNullableTypeFromGraphQLType(graphQLType, typeName) {
        if (graphQLType instanceof graphql_1.GraphQLList) {
            const elementType = typeFromGraphQLType(graphQLType.ofType, typeName);
            return t.TSArrayType(t.isTSUnionType(elementType) ? t.TSParenthesizedType(elementType) : elementType);
        }
        else if (graphQLType instanceof graphql_1.GraphQLScalarType) {
            const builtIn = builtInScalarMap[typeName || graphQLType.name];
            if (builtIn != null) {
                return builtIn;
            }
            else if (compilerOptions.passthroughCustomScalars) {
                return t.TSAnyKeyword();
            }
            else {
                return t.TSTypeReference(t.identifier(graphQLType.name));
            }
        }
        else if (graphQLType instanceof graphql_1.GraphQLNonNull) {
            return typeFromGraphQLType(graphQLType.ofType, typeName);
        }
        else {
            return t.TSTypeReference(t.identifier(typeName || graphQLType.name));
        }
    }
    function typeFromGraphQLType(graphQLType, typeName) {
        if (graphQLType instanceof graphql_1.GraphQLNonNull) {
            return nonNullableTypeFromGraphQLType(graphQLType.ofType, typeName);
        }
        else {
            const type = nonNullableTypeFromGraphQLType(graphQLType, typeName);
            return t.TSUnionType([type, t.TSNullKeyword()]);
        }
    }
    return typeFromGraphQLType;
}
exports.createTypeFromGraphQLTypeFunction = createTypeFromGraphQLTypeFunction;
//# sourceMappingURL=helpers.js.map