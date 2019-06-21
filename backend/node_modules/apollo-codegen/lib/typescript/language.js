"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeGeneration_1 = require("./codeGeneration");
const types_1 = require("./types");
function interfaceDeclaration(generator, { interfaceName, noBrackets }, closure) {
    generator.printNewlineIfNeeded();
    generator.printNewline();
    if (noBrackets) {
        generator.print(`export type ${interfaceName} = `);
    }
    else {
        generator.print(`export interface ${interfaceName} `);
    }
    generator.pushScope({ typeName: interfaceName });
    if (noBrackets) {
        generator.withinBlock(closure, '', '');
    }
    else {
        generator.withinBlock(closure, '{', '}');
    }
    generator.popScope();
    generator.print(';');
}
exports.interfaceDeclaration = interfaceDeclaration;
function propertyDeclaration(generator, { fieldName, type, propertyName, typeName, description, isInput, isArray, isNullable, isArrayElementNullable }, closure) {
    const name = fieldName || propertyName;
    if (description) {
        description.split('\n')
            .forEach(line => {
            generator.printOnNewline(`// ${line.trim()}`);
        });
    }
    if (closure) {
        generator.printOnNewline(name);
        if (isNullable && isInput) {
            generator.print('?');
        }
        generator.print(': ');
        if (isArray) {
            generator.print(' Array<');
        }
        generator.pushScope({ typeName: name });
        generator.withinBlock(closure);
        generator.popScope();
        if (isArray) {
            if (isArrayElementNullable) {
                generator.print(' | null');
            }
            generator.print(' >');
        }
        if (isNullable) {
            generator.print(' | null');
        }
    }
    else {
        generator.printOnNewline(name);
        if (isInput && isNullable) {
            generator.print('?');
        }
        generator.print(`: ${typeName || type && types_1.typeNameFromGraphQLType(generator.context, type)}`);
    }
    generator.print(',');
}
exports.propertyDeclaration = propertyDeclaration;
function propertySetsDeclaration(generator, property, propertySets, standalone = false) {
    const { description, fieldName, propertyName, isNullable, isArray, isArrayElementNullable, } = property;
    const name = fieldName || propertyName;
    if (description) {
        description.split('\n')
            .forEach(line => {
            generator.printOnNewline(`// ${line.trim()}`);
        });
    }
    if (!standalone) {
        generator.printOnNewline(`${name}: `);
    }
    if (isArray) {
        generator.print(' Array<');
    }
    generator.pushScope({ typeName: name });
    generator.withinBlock(() => {
        propertySets.forEach((propertySet, index, propertySets) => {
            generator.withinBlock(() => {
                codeGeneration_1.propertyDeclarations(generator, propertySet);
            });
            if (index !== propertySets.length - 1) {
                generator.print(' |');
            }
        });
    }, '(', ')');
    generator.popScope();
    if (isArray) {
        if (isArrayElementNullable) {
            generator.print(' | null');
        }
        generator.print(' >');
    }
    if (isNullable) {
        generator.print(' | null');
    }
    if (!standalone) {
        generator.print(',');
    }
}
exports.propertySetsDeclaration = propertySetsDeclaration;
//# sourceMappingURL=language.js.map