"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const printing_1 = require("../utilities/printing");
const graphql_2 = require("../utilities/graphql");
const CodeGenerator_1 = require("../utilities/CodeGenerator");
const language_1 = require("./language");
const types_1 = require("./types");
function generateSource(context) {
    const generator = new CodeGenerator_1.default(context);
    generator.printOnNewline('/* tslint:disable */');
    generator.printOnNewline('//  This file was automatically generated and should not be edited.');
    context.typesUsed.forEach(type => typeDeclarationForGraphQLType(generator, type));
    Object.values(context.operations).forEach(operation => {
        interfaceVariablesDeclarationForOperation(generator, operation);
        interfaceDeclarationForOperation(generator, operation);
    });
    Object.values(context.fragments).forEach(operation => interfaceDeclarationForFragment(generator, operation));
    generator.printNewline();
    return generator.output;
}
exports.generateSource = generateSource;
function typeDeclarationForGraphQLType(generator, type) {
    if (type instanceof graphql_1.GraphQLEnumType) {
        enumerationDeclaration(generator, type);
    }
    else if (type instanceof graphql_1.GraphQLInputObjectType) {
        structDeclarationForInputObjectType(generator, type);
    }
}
exports.typeDeclarationForGraphQLType = typeDeclarationForGraphQLType;
function enumerationDeclaration(generator, type) {
    const { name, description } = type;
    const values = type.getValues();
    generator.printNewlineIfNeeded();
    if (description) {
        description.split('\n')
            .forEach(line => {
            generator.printOnNewline(`// ${line.trim()}`);
        });
    }
    generator.printOnNewline(`export enum ${name} {`);
    graphql_2.sortEnumValues(values).forEach((value) => {
        if (!value.description || value.description.indexOf('\n') === -1) {
            generator.printOnNewline(`  ${value.value} = "${value.value}",${printing_1.wrap(' // ', value.description)}`);
        }
        else {
            if (value.description) {
                value.description.split('\n')
                    .forEach((line) => {
                    generator.printOnNewline(`  // ${line.trim()}`);
                });
            }
            generator.printOnNewline(`  ${value.value} = "${value.value}",`);
        }
    });
    generator.printOnNewline(`}`);
    generator.printNewline();
}
function structDeclarationForInputObjectType(generator, type) {
    const interfaceName = type.name;
    language_1.interfaceDeclaration(generator, {
        interfaceName,
    }, () => {
        const properties = propertiesFromFields(generator.context, Object.values(type.getFields()));
        propertyDeclarations(generator, properties, true);
    });
}
function interfaceNameFromOperation({ operationName, operationType }) {
    switch (operationType) {
        case 'query':
            return `${operationName}Query`;
            break;
        case 'mutation':
            return `${operationName}Mutation`;
            break;
        case 'subscription':
            return `${operationName}Subscription`;
            break;
        default:
            throw new graphql_1.GraphQLError(`Unsupported operation type "${operationType}"`);
    }
}
function interfaceVariablesDeclarationForOperation(generator, { operationName, operationType, variables }) {
    if (!variables || variables.length < 1) {
        return;
    }
    const interfaceName = `${interfaceNameFromOperation({ operationName, operationType })}Variables`;
    language_1.interfaceDeclaration(generator, {
        interfaceName,
    }, () => {
        const properties = propertiesFromFields(generator.context, variables);
        propertyDeclarations(generator, properties, true);
    });
}
exports.interfaceVariablesDeclarationForOperation = interfaceVariablesDeclarationForOperation;
function getObjectTypeName(type) {
    if (type instanceof graphql_1.GraphQLList) {
        return getObjectTypeName(type.ofType);
    }
    if (type instanceof graphql_1.GraphQLNonNull) {
        return getObjectTypeName(type.ofType);
    }
    if (type instanceof graphql_1.GraphQLObjectType) {
        return `"${type.name}"`;
    }
    if (type instanceof graphql_1.GraphQLUnionType) {
        return type.getTypes().map(type => getObjectTypeName(type)).join(" | ");
    }
    return `"${type.name}"`;
}
function updateTypeNameField(rootField) {
    const fields = rootField.fields && rootField.fields.map(field => {
        if (field.fieldName === '__typename') {
            const objectTypeName = getObjectTypeName(rootField.type);
            return Object.assign({}, field, { typeName: objectTypeName, type: { name: objectTypeName } });
        }
        if (field.fields) {
            return updateTypeNameField(field);
        }
        return field;
    });
    return Object.assign({}, rootField, { fields });
}
function interfaceDeclarationForOperation(generator, { operationName, operationType, fields }) {
    const interfaceName = interfaceNameFromOperation({ operationName, operationType });
    fields = fields.map(field => updateTypeNameField(field));
    const properties = propertiesFromFields(generator.context, fields);
    language_1.interfaceDeclaration(generator, {
        interfaceName,
    }, () => {
        propertyDeclarations(generator, properties);
    });
}
exports.interfaceDeclarationForOperation = interfaceDeclarationForOperation;
function interfaceDeclarationForFragment(generator, fragment) {
    const { fragmentName, typeCondition, fields, inlineFragments } = fragment;
    const interfaceName = `${fragmentName}Fragment`;
    language_1.interfaceDeclaration(generator, {
        interfaceName,
        noBrackets: graphql_1.isAbstractType(typeCondition)
    }, () => {
        if (graphql_1.isAbstractType(typeCondition)) {
            const propertySets = fragment.possibleTypes
                .map(type => {
                const inlineFragment = inlineFragments.find(inlineFragment => {
                    return inlineFragment.typeCondition.toString() == type.toString();
                });
                if (inlineFragment) {
                    const fields = inlineFragment.fields.map(field => {
                        if (field.fieldName === '__typename') {
                            return Object.assign({}, field, { typeName: `"${inlineFragment.typeCondition}"`, type: { name: `"${inlineFragment.typeCondition}"` } });
                        }
                        else {
                            return field;
                        }
                    });
                    return propertiesFromFields(generator.context, fields);
                }
                else {
                    const fragmentFields = fields.map(field => {
                        if (field.fieldName === '__typename') {
                            return Object.assign({}, field, { typeName: `"${type}"`, type: { name: `"${type}"` } });
                        }
                        else {
                            return field;
                        }
                    });
                    return propertiesFromFields(generator.context, fragmentFields);
                }
            });
            language_1.propertySetsDeclaration(generator, fragment, propertySets, true);
        }
        else {
            const fragmentFields = fields.map(field => {
                if (field.fieldName === '__typename') {
                    return Object.assign({}, field, { typeName: `"${fragment.typeCondition}"`, type: { name: `"${fragment.typeCondition}"` } });
                }
                else {
                    return field;
                }
            });
            const properties = propertiesFromFields(generator.context, fragmentFields);
            propertyDeclarations(generator, properties);
        }
    });
}
exports.interfaceDeclarationForFragment = interfaceDeclarationForFragment;
function propertiesFromFields(context, fields) {
    return fields.map(field => propertyFromField(context, field));
}
exports.propertiesFromFields = propertiesFromFields;
function propertyFromField(context, field) {
    let { name: fieldName, type: fieldType, description, fragmentSpreads, inlineFragments } = field;
    fieldName = fieldName || field.responseName;
    const propertyName = fieldName;
    let property = { fieldName, fieldType, propertyName, description };
    const namedType = graphql_1.getNamedType(fieldType);
    let isNullable = true;
    if (fieldType instanceof graphql_1.GraphQLNonNull) {
        isNullable = false;
    }
    if (graphql_1.isCompositeType(namedType)) {
        const typeName = types_1.typeNameFromGraphQLType(context, fieldType);
        let isArray = false;
        let isArrayElementNullable = null;
        if (fieldType instanceof graphql_1.GraphQLList) {
            isArray = true;
            isArrayElementNullable = !(fieldType.ofType instanceof graphql_1.GraphQLNonNull);
        }
        else if (fieldType instanceof graphql_1.GraphQLNonNull && fieldType.ofType instanceof graphql_1.GraphQLList) {
            isArray = true;
            isArrayElementNullable = !(fieldType.ofType.ofType instanceof graphql_1.GraphQLNonNull);
        }
        return Object.assign({}, property, { typeName, fields: field.fields, isComposite: true, fragmentSpreads, inlineFragments, fieldType,
            isArray, isNullable, isArrayElementNullable });
    }
    else {
        if (field.fieldName === '__typename') {
            const typeName = types_1.typeNameFromGraphQLType(context, fieldType, null, false);
            return Object.assign({}, property, { typeName, isComposite: false, fieldType, isNullable: false });
        }
        else {
            const typeName = types_1.typeNameFromGraphQLType(context, fieldType, null, isNullable);
            return Object.assign({}, property, { typeName, isComposite: false, fieldType, isNullable });
        }
    }
}
exports.propertyFromField = propertyFromField;
function propertyDeclarations(generator, properties, isInput = false) {
    if (!properties)
        return;
    properties.forEach(property => {
        if (graphql_1.isAbstractType(graphql_1.getNamedType(property.type || property.fieldType))) {
            const propertySets = getPossibleTypeNames(generator, property)
                .map(type => {
                const inlineFragment = property.inlineFragments && property.inlineFragments.find(inlineFragment => {
                    return inlineFragment.typeCondition.toString() == type;
                });
                if (inlineFragment) {
                    const fields = inlineFragment.fields.map(field => {
                        if (field.fieldName === '__typename') {
                            return Object.assign({}, field, { typeName: `"${inlineFragment.typeCondition}"`, type: { name: `"${inlineFragment.typeCondition}"` } });
                        }
                        else {
                            return field;
                        }
                    });
                    return propertiesFromFields(generator.context, fields);
                }
                else {
                    const fields = property.fields.map(field => {
                        if (field.fieldName === '__typename') {
                            return Object.assign({}, field, { typeName: `"${type}"`, type: { name: `"${type}"` } });
                        }
                        else {
                            return field;
                        }
                    });
                    return propertiesFromFields(generator.context, fields);
                }
            });
            language_1.propertySetsDeclaration(generator, property, propertySets);
        }
        else {
            if (property.fields && property.fields.length > 0
                || property.inlineFragments && property.inlineFragments.length > 0
                || property.fragmentSpreads && property.fragmentSpreads.length > 0) {
                language_1.propertyDeclaration(generator, property, () => {
                    const fields = property.fields.map(field => {
                        if (field.fieldName === '__typename') {
                            const objectTypeName = getObjectTypeName(property.fieldType || property.type);
                            return Object.assign({}, field, { typeName: objectTypeName, type: { name: objectTypeName } });
                        }
                        else {
                            return field;
                        }
                    });
                    const properties = propertiesFromFields(generator.context, fields);
                    propertyDeclarations(generator, properties, isInput);
                });
            }
            else {
                language_1.propertyDeclaration(generator, Object.assign({}, property, { isInput }));
            }
        }
    });
}
exports.propertyDeclarations = propertyDeclarations;
function getPossibleTypeNames(generator, property) {
    const type = graphql_1.getNamedType(property.fieldType || property.type);
    if (type instanceof graphql_1.GraphQLUnionType || type instanceof graphql_1.GraphQLInterfaceType) {
        return generator.context.schema.getPossibleTypes(type).map(type => type.name);
    }
    return [];
}
//# sourceMappingURL=codeGeneration.js.map