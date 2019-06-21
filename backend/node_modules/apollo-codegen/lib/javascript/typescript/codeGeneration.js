"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t = require("@babel/types");
const common_tags_1 = require("common-tags");
const graphql_1 = require("graphql");
const path = require("path");
const typeCase_1 = require("../../compiler/visitors/typeCase");
const collectAndMergeFields_1 = require("../../compiler/visitors/collectAndMergeFields");
const language_1 = require("./language");
const printer_1 = require("./printer");
class TypescriptGeneratedFile {
    constructor(fileContents) {
        this.fileContents = fileContents;
    }
    get output() {
        return this.fileContents;
    }
}
function printEnumsAndInputObjects(generator, context) {
    generator.printer.enqueue(common_tags_1.stripIndent `
    //==============================================================
    // START Enums and Input Objects
    // All enums and input objects are included in every output file
    // for now, but this will be changed soon.
    // TODO: Link to issue to fix this.
    //==============================================================
  `);
    context.typesUsed
        .filter(type => (type instanceof graphql_1.GraphQLEnumType))
        .forEach((enumType) => {
        generator.typeAliasForEnumType(enumType);
    });
    context.typesUsed
        .filter(type => type instanceof graphql_1.GraphQLInputObjectType)
        .forEach((inputObjectType) => {
        generator.typeAliasForInputObjectType(inputObjectType);
    });
    generator.printer.enqueue(common_tags_1.stripIndent `
    //==============================================================
    // END Enums and Input Objects
    //==============================================================
  `);
}
function generateSource(context) {
    const generator = new TypescriptAPIGenerator(context);
    const generatedFiles = {};
    Object.values(context.operations)
        .forEach((operation) => {
        generator.fileHeader();
        generator.interfacesForOperation(operation);
        printEnumsAndInputObjects(generator, context);
        const output = generator.printer.printAndClear();
        const outputFilePath = path.join(path.dirname(operation.filePath), '__generated__', `${operation.operationName}.ts`);
        generatedFiles[outputFilePath] = new TypescriptGeneratedFile(output);
    });
    Object.values(context.fragments)
        .forEach((fragment) => {
        generator.fileHeader();
        generator.interfacesForFragment(fragment);
        printEnumsAndInputObjects(generator, context);
        const output = generator.printer.printAndClear();
        const outputFilePath = path.join(path.dirname(fragment.filePath), '__generated__', `${fragment.fragmentName}.ts`);
        generatedFiles[outputFilePath] = new TypescriptGeneratedFile(output);
    });
    return generatedFiles;
}
exports.generateSource = generateSource;
class TypescriptAPIGenerator extends language_1.default {
    constructor(context) {
        super(context.options);
        this.context = context;
        this.printer = new printer_1.default();
        this.scopeStack = [];
    }
    fileHeader() {
        this.printer.enqueue(common_tags_1.stripIndent `
        /* tslint:disable */
        // This file was automatically generated and should not be edited.
      `);
    }
    typeAliasForEnumType(enumType) {
        this.printer.enqueue(this.enumerationDeclaration(enumType));
    }
    typeAliasForInputObjectType(inputObjectType) {
        this.printer.enqueue(this.inputObjectDeclaration(inputObjectType));
    }
    interfacesForOperation(operation) {
        const { operationType, operationName, variables, selectionSet } = operation;
        this.scopeStackPush(operationName);
        this.printer.enqueue(common_tags_1.stripIndent `
      // ====================================================
      // GraphQL ${operationType} operation: ${operationName}
      // ====================================================
    `);
        const variants = this.getVariantsForSelectionSet(selectionSet);
        const variant = variants[0];
        const properties = this.getPropertiesForVariant(variant);
        const exportedTypeAlias = this.exportDeclaration(this.interface(operationName, properties));
        this.printer.enqueue(exportedTypeAlias);
        this.scopeStackPop();
        if (variables.length > 0) {
            const interfaceName = operationName + 'Variables';
            this.scopeStackPush(interfaceName);
            this.printer.enqueue(this.exportDeclaration(this.interface(interfaceName, variables.map((variable) => ({
                name: variable.name,
                type: this.typeFromGraphQLType(variable.type)
            })), { keyInheritsNullability: true })));
            this.scopeStackPop();
        }
    }
    interfacesForFragment(fragment) {
        const { fragmentName, selectionSet } = fragment;
        this.scopeStackPush(fragmentName);
        this.printer.enqueue(common_tags_1.stripIndent `
      // ====================================================
      // GraphQL fragment: ${fragmentName}
      // ====================================================
    `);
        const variants = this.getVariantsForSelectionSet(selectionSet);
        if (variants.length === 1) {
            const properties = this.getPropertiesForVariant(variants[0]);
            const name = this.nameFromScopeStack(this.scopeStack);
            const exportedTypeAlias = this.exportDeclaration(this.interface(name, properties));
            this.printer.enqueue(exportedTypeAlias);
        }
        else {
            const unionMembers = [];
            variants.forEach(variant => {
                this.scopeStackPush(variant.possibleTypes[0].toString());
                const properties = this.getPropertiesForVariant(variant);
                const name = this.nameFromScopeStack(this.scopeStack);
                const exportedTypeAlias = this.exportDeclaration(this.interface(name, properties));
                this.printer.enqueue(exportedTypeAlias);
                unionMembers.push(t.identifier(this.nameFromScopeStack(this.scopeStack)));
                this.scopeStackPop();
            });
            this.printer.enqueue(this.exportDeclaration(this.typeAliasGenericUnion(this.nameFromScopeStack(this.scopeStack), unionMembers.map((id) => t.TSTypeReference(id)))));
        }
        this.scopeStackPop();
    }
    getVariantsForSelectionSet(selectionSet) {
        return this.getTypeCasesForSelectionSet(selectionSet).exhaustiveVariants;
    }
    getTypeCasesForSelectionSet(selectionSet) {
        return typeCase_1.typeCaseForSelectionSet(selectionSet, this.context.options.mergeInFieldsFromFragmentSpreads);
    }
    getPropertiesForVariant(variant) {
        const fields = collectAndMergeFields_1.collectAndMergeFields(variant, this.context.options.mergeInFieldsFromFragmentSpreads);
        return fields.map(field => {
            const fieldName = field.alias !== undefined ? field.alias : field.name;
            this.scopeStackPush(fieldName);
            let res;
            if (field.selectionSet) {
                res = this.handleFieldSelectionSetValue(t.identifier(this.nameFromScopeStack(this.scopeStack)), field);
            }
            else {
                res = this.handleFieldValue(field, variant);
            }
            this.scopeStackPop();
            return res;
        });
    }
    handleFieldSelectionSetValue(generatedIdentifier, field) {
        const { selectionSet } = field;
        const type = this.typeFromGraphQLType(field.type, generatedIdentifier.name);
        const typeCase = this.getTypeCasesForSelectionSet(selectionSet);
        const variants = typeCase.exhaustiveVariants;
        let exportedTypeAlias;
        if (variants.length === 1) {
            const variant = variants[0];
            const properties = this.getPropertiesForVariant(variant);
            exportedTypeAlias = this.exportDeclaration(this.interface(this.nameFromScopeStack(this.scopeStack), properties));
        }
        else {
            const identifiers = variants.map(variant => {
                this.scopeStackPush(variant.possibleTypes[0].toString());
                const properties = this.getPropertiesForVariant(variant);
                const identifierName = this.nameFromScopeStack(this.scopeStack);
                this.printer.enqueue(this.exportDeclaration(this.interface(identifierName, properties)));
                this.scopeStackPop();
                return t.identifier(identifierName);
            });
            exportedTypeAlias = this.exportDeclaration(this.typeAliasGenericUnion(generatedIdentifier.name, identifiers.map(i => t.TSTypeReference(i))));
        }
        this.printer.enqueue(exportedTypeAlias);
        return {
            name: field.alias ? field.alias : field.name,
            description: field.description,
            type
        };
    }
    handleFieldValue(field, variant) {
        let res;
        if (field.name === '__typename') {
            const types = variant.possibleTypes
                .map(type => {
                return t.TSLiteralType(t.stringLiteral(type.toString()));
            });
            res = {
                name: field.alias ? field.alias : field.name,
                description: field.description,
                type: t.TSUnionType(types)
            };
        }
        else {
            res = {
                name: field.alias ? field.alias : field.name,
                description: field.description,
                type: this.typeFromGraphQLType(field.type)
            };
        }
        return res;
    }
    get output() {
        return this.printer.print();
    }
    scopeStackPush(name) {
        this.scopeStack.push(name);
    }
    scopeStackPop() {
        const popped = this.scopeStack.pop();
        return popped;
    }
}
exports.TypescriptAPIGenerator = TypescriptAPIGenerator;
//# sourceMappingURL=codeGeneration.js.map