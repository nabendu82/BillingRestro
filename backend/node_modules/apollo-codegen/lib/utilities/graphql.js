"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
function sortEnumValues(values) {
    return values.sort((a, b) => a.value < b.value ? -1 : a.value > b.value ? 1 : 0);
}
exports.sortEnumValues = sortEnumValues;
function isList(type) {
    return type instanceof graphql_1.GraphQLList || (type instanceof graphql_1.GraphQLNonNull && type.ofType instanceof graphql_1.GraphQLList);
}
exports.isList = isList;
function isMetaFieldName(name) {
    return name.startsWith('__');
}
exports.isMetaFieldName = isMetaFieldName;
const typenameField = { kind: graphql_1.Kind.FIELD, name: { kind: graphql_1.Kind.NAME, value: '__typename' } };
function withTypenameFieldAddedWhereNeeded(ast) {
    return graphql_1.visit(ast, {
        enter: {
            SelectionSet(node) {
                return Object.assign({}, node, { selections: node.selections.filter(selection => !(selection.kind === 'Field' && selection.name.value === '__typename')) });
            }
        },
        leave(node) {
            if (!(node.kind === 'Field' || node.kind === 'FragmentDefinition'))
                return undefined;
            if (!node.selectionSet)
                return undefined;
            if (true) {
                return Object.assign({}, node, { selectionSet: Object.assign({}, node.selectionSet, { selections: [typenameField, ...node.selectionSet.selections] }) });
            }
            else {
                return undefined;
            }
        }
    });
}
exports.withTypenameFieldAddedWhereNeeded = withTypenameFieldAddedWhereNeeded;
function sourceAt(location) {
    return location.source.body.slice(location.start, location.end);
}
exports.sourceAt = sourceAt;
function filePathForNode(node) {
    const name = node.loc && node.loc.source && node.loc.source.name;
    if (!name || name === "GraphQL") {
        throw new Error("Node does not seem to have a file path");
    }
    return name;
}
exports.filePathForNode = filePathForNode;
function valueFromValueNode(valueNode) {
    switch (valueNode.kind) {
        case 'IntValue':
        case 'FloatValue':
            return Number(valueNode.value);
        case 'NullValue':
            return null;
        case 'ListValue':
            return valueNode.values.map(valueFromValueNode);
        case 'ObjectValue':
            return valueNode.fields.reduce((object, field) => {
                object[field.name.value] = valueFromValueNode(field.value);
                return object;
            }, {});
        case 'Variable':
            return { kind: 'Variable', variableName: valueNode.name.value };
        default:
            return valueNode.value;
    }
}
exports.valueFromValueNode = valueFromValueNode;
function isTypeProperSuperTypeOf(schema, maybeSuperType, subType) {
    return graphql_1.isEqualType(maybeSuperType, subType) || subType instanceof graphql_1.GraphQLObjectType && (graphql_1.isAbstractType(maybeSuperType) && schema.isPossibleType(maybeSuperType, subType));
}
exports.isTypeProperSuperTypeOf = isTypeProperSuperTypeOf;
function getOperationRootType(schema, operation) {
    switch (operation.operation) {
        case 'query':
            return schema.getQueryType();
        case 'mutation':
            const mutationType = schema.getMutationType();
            if (!mutationType) {
                throw new graphql_1.GraphQLError('Schema is not configured for mutations', [operation]);
            }
            return mutationType;
        case 'subscription':
            const subscriptionType = schema.getSubscriptionType();
            if (!subscriptionType) {
                throw new graphql_1.GraphQLError('Schema is not configured for subscriptions', [operation]);
            }
            return subscriptionType;
        default:
            throw new graphql_1.GraphQLError('Can only compile queries, mutations and subscriptions', [operation]);
    }
}
exports.getOperationRootType = getOperationRootType;
function getFieldDef(schema, parentType, fieldAST) {
    const name = fieldAST.name.value;
    if (name === graphql_1.SchemaMetaFieldDef.name &&
        schema.getQueryType() === parentType) {
        return graphql_1.SchemaMetaFieldDef;
    }
    if (name === graphql_1.TypeMetaFieldDef.name &&
        schema.getQueryType() === parentType) {
        return graphql_1.TypeMetaFieldDef;
    }
    if (name === graphql_1.TypeNameMetaFieldDef.name &&
        (parentType instanceof graphql_1.GraphQLObjectType ||
            parentType instanceof graphql_1.GraphQLInterfaceType ||
            parentType instanceof graphql_1.GraphQLUnionType)) {
        return graphql_1.TypeNameMetaFieldDef;
    }
    if (parentType instanceof graphql_1.GraphQLObjectType ||
        parentType instanceof graphql_1.GraphQLInterfaceType) {
        return parentType.getFields()[name];
    }
    return undefined;
}
exports.getFieldDef = getFieldDef;
//# sourceMappingURL=graphql.js.map