"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const t = require("@babel/types");
const helpers_1 = require("../helpers");
const typeFromGraphQLType = helpers_1.createTypeFromGraphQLTypeFunction({
    passthroughCustomScalars: false
});
function nullableType(type) {
    return t.TSUnionType([
        type,
        t.TSNullKeyword()
    ]);
}
describe('Typescript typeAnnotationFromGraphQLType', () => {
    test('String', () => {
        expect(typeFromGraphQLType(graphql_1.GraphQLString))
            .toMatchObject(nullableType(t.TSStringKeyword()));
    });
    test('Int', () => {
        expect(typeFromGraphQLType(graphql_1.GraphQLInt))
            .toMatchObject(nullableType(t.TSNumberKeyword()));
    });
    test('Float', () => {
        expect(typeFromGraphQLType(graphql_1.GraphQLFloat))
            .toMatchObject(nullableType(t.TSNumberKeyword()));
    });
    test('Boolean', () => {
        expect(typeFromGraphQLType(graphql_1.GraphQLBoolean))
            .toMatchObject(nullableType(t.TSBooleanKeyword()));
    });
    test('ID', () => {
        expect(typeFromGraphQLType(graphql_1.GraphQLID))
            .toMatchObject(nullableType(t.TSStringKeyword()));
    });
    test('String!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString))).toMatchObject(t.TSStringKeyword());
    });
    test('Int!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt))).toMatchObject(t.TSNumberKeyword());
    });
    test('Float!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat))).toMatchObject(t.TSNumberKeyword());
    });
    test('Boolean!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean))).toMatchObject(t.TSBooleanKeyword());
    });
    test('ID!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(graphql_1.GraphQLID))).toMatchObject(t.TSStringKeyword());
    });
    test('[String]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(graphql_1.GraphQLString))).toMatchObject(nullableType(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSStringKeyword())))));
    });
    test('[Int]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(graphql_1.GraphQLInt))).toMatchObject(nullableType(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSNumberKeyword())))));
    });
    test('[Float]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(graphql_1.GraphQLFloat))).toMatchObject(nullableType(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSNumberKeyword())))));
    });
    test('[Boolean]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(graphql_1.GraphQLBoolean))).toMatchObject(nullableType(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSBooleanKeyword())))));
    });
    test('[ID]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(graphql_1.GraphQLID))).toMatchObject(nullableType(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSStringKeyword())))));
    });
    test('[String]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)))).toMatchObject(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSStringKeyword()))));
    });
    test('[Int]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLInt)))).toMatchObject(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSNumberKeyword()))));
    });
    test('[Float]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLFloat)))).toMatchObject(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSNumberKeyword()))));
    });
    test('[Boolean]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLBoolean)))).toMatchObject(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSBooleanKeyword()))));
    });
    test('[ID]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLID)))).toMatchObject(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSStringKeyword()))));
    });
    test('[String!]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)))).toMatchObject(nullableType(t.TSArrayType(t.TSStringKeyword())));
    });
    test('[Int!]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull((graphql_1.GraphQLInt))))).toMatchObject(nullableType(t.TSArrayType(t.TSNumberKeyword())));
    });
    test('[Float!]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat)))).toMatchObject(nullableType(t.TSArrayType(t.TSNumberKeyword())));
    });
    test('[Boolean!]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean)))).toMatchObject(nullableType(t.TSArrayType(t.TSBooleanKeyword())));
    });
    test('[ID!]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)))).toMatchObject(nullableType(t.TSArrayType(t.TSStringKeyword())));
    });
    test('[String!]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLString))))).toMatchObject(t.TSArrayType(t.TSStringKeyword()));
    });
    test('[Int!]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt))))).toMatchObject(t.TSArrayType(t.TSNumberKeyword()));
    });
    test('[Float!]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat))))).toMatchObject(t.TSArrayType(t.TSNumberKeyword()));
    });
    test('[Boolean!]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean))))).toMatchObject(t.TSArrayType(t.TSBooleanKeyword()));
    });
    test('[ID!]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(graphql_1.GraphQLID))))).toMatchObject(t.TSArrayType(t.TSStringKeyword()));
    });
    test('[[String]]', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLList(new graphql_1.GraphQLList(graphql_1.GraphQLString)))).toMatchObject(nullableType(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSStringKeyword()))))))));
    });
    test('[[String]]!', () => {
        expect(typeFromGraphQLType(new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLList(graphql_1.GraphQLString))))).toMatchObject(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSArrayType(t.TSParenthesizedType(nullableType(t.TSStringKeyword())))))));
    });
    test('Custom Scalar', () => {
        const OddType = new graphql_1.GraphQLScalarType({
            name: 'Odd',
            serialize(value) {
                return value % 2 === 1 ? value : null;
            }
        });
        expect(typeFromGraphQLType(OddType)).toMatchObject(nullableType(t.TSTypeReference(t.identifier('Odd'))));
    });
});
describe('passthrough custom scalars', () => {
    let getTypeAnnotation;
    beforeAll(() => {
        getTypeAnnotation = helpers_1.createTypeFromGraphQLTypeFunction({
            passthroughCustomScalars: true
        });
    });
    test('Custom Scalar', () => {
        const OddType = new graphql_1.GraphQLScalarType({
            name: 'Odd',
            serialize(value) {
                return value % 2 === 1 ? value : null;
            }
        });
        expect(getTypeAnnotation(OddType)).toMatchObject(nullableType(t.TSAnyKeyword()));
    });
});
//# sourceMappingURL=helpers.js.map