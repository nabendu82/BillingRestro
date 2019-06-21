"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const t = require("@babel/types");
const builtInScalarMap = {
    [graphql_1.GraphQLString.name]: t.stringTypeAnnotation(),
    [graphql_1.GraphQLInt.name]: t.numberTypeAnnotation(),
    [graphql_1.GraphQLFloat.name]: t.numberTypeAnnotation(),
    [graphql_1.GraphQLBoolean.name]: t.booleanTypeAnnotation(),
    [graphql_1.GraphQLID.name]: t.stringTypeAnnotation(),
};
function createTypeAnnotationFromGraphQLTypeFunction(compilerOptions) {
    const arrayType = compilerOptions.useFlowReadOnlyTypes ? '$ReadOnlyArray' : 'Array';
    function nonNullableTypeAnnotationFromGraphQLType(type, typeName) {
        if (type instanceof graphql_1.GraphQLList) {
            return t.genericTypeAnnotation(t.identifier(arrayType), t.typeParameterInstantiation([typeAnnotationFromGraphQLType(type.ofType, typeName)]));
        }
        else if (type instanceof graphql_1.GraphQLScalarType) {
            const builtIn = builtInScalarMap[typeName || type.name];
            if (builtIn != null) {
                return builtIn;
            }
            else if (compilerOptions.passthroughCustomScalars) {
                return t.anyTypeAnnotation();
            }
            else {
                return t.genericTypeAnnotation(t.identifier(typeName || type.name));
            }
        }
        else if (type instanceof graphql_1.GraphQLNonNull) {
            return typeAnnotationFromGraphQLType(type.ofType, typeName);
        }
        else {
            return t.genericTypeAnnotation(t.identifier(typeName || type.name));
        }
    }
    function typeAnnotationFromGraphQLType(type, typeName) {
        if (type instanceof graphql_1.GraphQLNonNull) {
            return nonNullableTypeAnnotationFromGraphQLType(type.ofType, typeName);
        }
        else {
            return t.nullableTypeAnnotation(nonNullableTypeAnnotationFromGraphQLType(type, typeName));
        }
    }
    return typeAnnotationFromGraphQLType;
}
exports.createTypeAnnotationFromGraphQLTypeFunction = createTypeAnnotationFromGraphQLTypeFunction;
//# sourceMappingURL=helpers.js.map