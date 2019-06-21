"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const builtInScalarMap = {
    [graphql_1.GraphQLString.name]: 'String',
    [graphql_1.GraphQLInt.name]: 'Int',
    [graphql_1.GraphQLFloat.name]: 'Double',
    [graphql_1.GraphQLBoolean.name]: 'Boolean',
    [graphql_1.GraphQLID.name]: 'String',
};
function possibleTypesForType(context, type) {
    if (graphql_1.isAbstractType(type)) {
        return context.schema.getPossibleTypes(type);
    }
    else {
        return [type];
    }
}
exports.possibleTypesForType = possibleTypesForType;
function typeNameFromGraphQLType(context, type, bareTypeName, isOptional) {
    if (type instanceof graphql_1.GraphQLNonNull) {
        return typeNameFromGraphQLType(context, type.ofType, bareTypeName, isOptional || false);
    }
    else if (isOptional === undefined) {
        isOptional = true;
    }
    let typeName;
    if (type instanceof graphql_1.GraphQLList) {
        typeName = 'Seq[' + typeNameFromGraphQLType(context, type.ofType, bareTypeName) + ']';
    }
    else if (type instanceof graphql_1.GraphQLScalarType) {
        typeName = typeNameForScalarType(context, type);
    }
    else if (type instanceof graphql_1.GraphQLEnumType) {
        typeName = "String";
    }
    else {
        typeName = bareTypeName || type.name;
    }
    return isOptional ? `Option[${typeName}]` : typeName;
}
exports.typeNameFromGraphQLType = typeNameFromGraphQLType;
function typeNameForScalarType(context, type) {
    return builtInScalarMap[type.name] || (context.passthroughCustomScalars ? context.customScalarsPrefix + type.name : graphql_1.GraphQLString);
}
//# sourceMappingURL=types.js.map