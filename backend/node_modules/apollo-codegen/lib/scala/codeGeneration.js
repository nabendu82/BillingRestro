"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("../utilities/graphql");
const printing_1 = require("../utilities/printing");
const language_1 = require("./language");
const naming_1 = require("./naming");
const values_1 = require("./values");
const types_1 = require("./types");
const CodeGenerator_1 = require("../utilities/CodeGenerator");
function generateSource(context, options) {
    const generator = new CodeGenerator_1.default(context);
    generator.printOnNewline('//  This file was automatically generated and should not be edited.');
    generator.printNewline();
    if (context.namespace) {
        language_1.packageDeclaration(generator, context.namespace);
    }
    context.typesUsed.forEach(type => {
        typeDeclarationForGraphQLType(generator, type);
    });
    Object.values(context.operations).forEach(operation => {
        classDeclarationForOperation(generator, operation);
    });
    Object.values(context.fragments).forEach(fragment => {
        caseClassDeclarationForFragment(generator, fragment);
    });
    return generator.output;
}
exports.generateSource = generateSource;
function classDeclarationForOperation(generator, { operationName, operationType, rootType, variables, fields, inlineFragments, fragmentSpreads, fragmentsReferenced, source, sourceWithFragments, operationId }) {
    let objectName;
    let protocol;
    switch (operationType) {
        case 'query':
            objectName = `${naming_1.operationClassName(operationName)}Query`;
            protocol = 'com.apollographql.scalajs.GraphQLQuery';
            break;
        case 'mutation':
            objectName = `${naming_1.operationClassName(operationName)}Mutation`;
            protocol = 'com.apollographql.scalajs.GraphQLMutation';
            break;
        default:
            throw new graphql_1.GraphQLError(`Unsupported operation type "${operationType}"`);
    }
    language_1.objectDeclaration(generator, {
        objectName,
        modifiers: [],
        superclass: protocol
    }, () => {
        if (source) {
            generator.printOnNewline('val operationString =');
            generator.withIndent(() => {
                values_1.multilineString(generator, source);
            });
        }
        operationIdentifier(generator, { operationName, sourceWithFragments, operationId });
        if (fragmentsReferenced && fragmentsReferenced.length > 0) {
            generator.printNewlineIfNeeded();
            generator.printOnNewline('val requestString: String = { operationString');
            fragmentsReferenced.forEach(fragment => {
                generator.print(` + ${naming_1.caseClassNameForFragmentName(fragment)}.fragmentString`);
            });
            generator.print(' }');
            generator.printOnNewline('val operation = com.apollographql.scalajs.gql(requestString)');
        }
        else {
            generator.printOnNewline('val operation = com.apollographql.scalajs.gql(operationString)');
        }
        generator.printNewlineIfNeeded();
        if (variables && variables.length > 0) {
            const properties = variables.map(({ name, type }) => {
                const propertyName = language_1.escapeIdentifierIfNeeded(name);
                const typeName = types_1.typeNameFromGraphQLType(generator.context, type);
                const isOptional = !(type instanceof graphql_1.GraphQLNonNull || type.ofType instanceof graphql_1.GraphQLNonNull);
                return { name, propertyName, type, typeName, isOptional };
            });
            language_1.caseClassDeclaration(generator, { caseClassName: 'Variables', description: '', params: properties.map(p => {
                    return {
                        name: p.propertyName,
                        type: p.typeName
                    };
                }) }, () => { });
        }
        else {
            generator.printOnNewline('type Variables = Unit');
        }
        caseClassDeclarationForSelectionSet(generator, {
            caseClassName: "Data",
            parentType: rootType,
            fields,
            inlineFragments,
            fragmentSpreads
        });
    });
}
exports.classDeclarationForOperation = classDeclarationForOperation;
function caseClassDeclarationForFragment(generator, { fragmentName, typeCondition, fields, inlineFragments, fragmentSpreads, source }) {
    const caseClassName = naming_1.caseClassNameForFragmentName(fragmentName);
    caseClassDeclarationForSelectionSet(generator, {
        caseClassName,
        parentType: typeCondition,
        fields,
        inlineFragments,
        fragmentSpreads
    }, () => { }, () => {
        if (source) {
            generator.printOnNewline('val fragmentString =');
            generator.withIndent(() => {
                values_1.multilineString(generator, source);
            });
        }
    });
}
exports.caseClassDeclarationForFragment = caseClassDeclarationForFragment;
function caseClassDeclarationForSelectionSet(generator, { caseClassName, parentType, fields, inlineFragments, fragmentSpreads, viewableAs }, beforeClosure, objectClosure) {
    const possibleTypes = parentType ? types_1.possibleTypesForType(generator.context, parentType) : null;
    let properties;
    if (!possibleTypes || possibleTypes.length == 1) {
        properties = fields
            .map(field => naming_1.propertyFromField(generator.context, field))
            .filter(field => field.propertyName != "__typename");
        language_1.caseClassDeclaration(generator, { caseClassName, params: properties.map(p => {
                return {
                    name: p.responseName,
                    type: p.typeName,
                };
            }) }, () => { });
    }
    else {
        generator.printNewlineIfNeeded();
        const properties = fields
            .map(field => naming_1.propertyFromField(generator.context, field))
            .filter(field => field.propertyName != "__typename");
        language_1.caseClassDeclaration(generator, { caseClassName, params: properties.map(p => {
                return {
                    name: p.responseName,
                    type: p.typeName,
                };
            }), superclass: 'me.shadaj.slinky.core.WithRaw' }, () => {
            if (inlineFragments && inlineFragments.length > 0) {
                inlineFragments.forEach((inlineFragment) => {
                    const fragClass = naming_1.caseClassNameForInlineFragment(inlineFragment);
                    generator.printOnNewline(`def as${inlineFragment.typeCondition}`);
                    generator.print(`: Option[${fragClass}] =`);
                    generator.withinBlock(() => {
                        generator.printOnNewline(`if (${fragClass}.possibleTypes.contains(this.raw.__typename.asInstanceOf[String])) Some(implicitly[me.shadaj.slinky.core.Reader[${fragClass}]].read(this.raw)) else None`);
                    });
                });
            }
            if (fragmentSpreads) {
                fragmentSpreads.forEach(s => {
                    const fragment = generator.context.fragments[s];
                    const alwaysDefined = graphql_2.isTypeProperSuperTypeOf(generator.context.schema, fragment.typeCondition, parentType);
                    if (!alwaysDefined) {
                        generator.printOnNewline(`def as${s}`);
                        generator.print(`: Option[${s}] =`);
                        generator.withinBlock(() => {
                            generator.printOnNewline(`if (${s}.possibleTypes.contains(this.raw.__typename.asInstanceOf[String])) Some(implicitly[me.shadaj.slinky.core.Reader[${s}]].read(this.raw)) else None`);
                        });
                    }
                });
            }
        });
        if (inlineFragments && inlineFragments.length > 0) {
            inlineFragments.forEach((inlineFragment) => {
                caseClassDeclarationForSelectionSet(generator, {
                    caseClassName: naming_1.caseClassNameForInlineFragment(inlineFragment),
                    parentType: inlineFragment.typeCondition,
                    fields: inlineFragment.fields,
                    inlineFragments: inlineFragment.inlineFragments,
                    fragmentSpreads: inlineFragment.fragmentSpreads,
                    viewableAs: {
                        caseClassName,
                        properties,
                    },
                });
            });
        }
    }
    language_1.objectDeclaration(generator, { objectName: caseClassName }, () => {
        if (possibleTypes) {
            generator.printNewlineIfNeeded();
            generator.printOnNewline('val possibleTypes = scala.collection.Set(');
            generator.print(printing_1.join(possibleTypes.map(type => `"${String(type)}"`), ', '));
            generator.print(')');
        }
        if (viewableAs) {
            generator.printOnNewline(`implicit def to${viewableAs.caseClassName}(a: ${caseClassName}): ${viewableAs.caseClassName} = ${viewableAs.caseClassName}(${viewableAs.properties.map(p => "a." + p.responseName).join(', ')})`);
        }
        if (fragmentSpreads) {
            fragmentSpreads.forEach(s => {
                const fragment = generator.context.fragments[s];
                const alwaysDefined = graphql_2.isTypeProperSuperTypeOf(generator.context.schema, fragment.typeCondition, parentType);
                if (alwaysDefined) {
                    generator.printOnNewline(`implicit def to${s}(a: ${caseClassName}): ${s} = ${s}(${(fragment.fields || []).map(p => "a." + p.responseName).join(', ')})`);
                }
            });
        }
        if (objectClosure) {
            objectClosure();
        }
    });
    fields.filter(field => graphql_1.isCompositeType(graphql_1.getNamedType(field.type))).forEach(field => {
        caseClassDeclarationForSelectionSet(generator, {
            caseClassName: naming_1.caseClassNameForPropertyName(field.responseName),
            parentType: graphql_1.getNamedType(field.type),
            fields: field.fields,
            inlineFragments: field.inlineFragments,
            fragmentSpreads: field.fragmentSpreads
        });
    });
}
exports.caseClassDeclarationForSelectionSet = caseClassDeclarationForSelectionSet;
function operationIdentifier(generator, { operationName, sourceWithFragments, operationId }) {
    if (!generator.context.generateOperationIds) {
        return;
    }
    generator.printNewlineIfNeeded();
    generator.printOnNewline(`val operationIdentifier: String = "${operationId}"`);
}
function typeDeclarationForGraphQLType(generator, type) {
    if (type instanceof graphql_1.GraphQLEnumType) {
        enumerationDeclaration(generator, type);
    }
    else if (type instanceof graphql_1.GraphQLInputObjectType) {
        caseClassDeclarationForInputObjectType(generator, type);
    }
}
exports.typeDeclarationForGraphQLType = typeDeclarationForGraphQLType;
function enumerationDeclaration(generator, type) {
    const { name, description } = type;
    const values = type.getValues();
    generator.printNewlineIfNeeded();
    language_1.comment(generator, description);
    generator.printOnNewline(`object ${name}`);
    generator.withinBlock(() => {
        values.forEach(value => {
            language_1.comment(generator, value.description);
            generator.printOnNewline(`val ${language_1.escapeIdentifierIfNeeded(naming_1.enumCaseName(value.name))} = "${value.value}"`);
        });
    });
    generator.printNewline();
}
function caseClassDeclarationForInputObjectType(generator, type) {
    const { name: caseClassName, description } = type;
    const fields = Object.values(type.getFields());
    const properties = fields.map(field => naming_1.propertyFromField(generator.context, field));
    language_1.caseClassDeclaration(generator, { caseClassName, description, params: properties.map(p => {
            return {
                name: p.propertyName,
                type: p.typeName
            };
        }) }, () => { });
}
//# sourceMappingURL=codeGeneration.js.map