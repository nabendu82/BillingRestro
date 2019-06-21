"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeGeneration_1 = require("./codeGeneration");
const types_1 = require("./types");
function typeDeclaration(generator, { interfaceName, noBrackets }, closure) {
    generator.printNewlineIfNeeded();
    generator.printNewline();
    generator.print(`export type ${interfaceName} = `);
    generator.pushScope({ typeName: interfaceName });
    if (noBrackets) {
        generator.withinBlock(closure, '', '');
    }
    else {
        generator.withinBlock(closure, '{|', '|}');
    }
    generator.popScope();
    generator.print(';');
}
exports.typeDeclaration = typeDeclaration;
function propertyDeclaration(generator, { fieldName, type, propertyName, typeName, description, isArray, isNullable, isArrayElementNullable, fragmentSpreads, isInput }, closure, open = ' {|', close = '|}') {
    const name = fieldName || propertyName;
    if (description) {
        description.split('\n')
            .forEach(line => {
            generator.printOnNewline(`// ${line.trim()}`);
        });
    }
    if (closure) {
        generator.printOnNewline(name);
        if (isInput && isNullable) {
            generator.print('?');
        }
        generator.print(':');
        if (isNullable) {
            generator.print(' ?');
        }
        if (isArray) {
            if (!isNullable) {
                generator.print(' ');
            }
            generator.print(' Array<');
            if (isArrayElementNullable) {
                generator.print('?');
            }
        }
        generator.pushScope({ typeName: name });
        generator.withinBlock(closure, open, close);
        generator.popScope();
        if (isArray) {
            generator.print(' >');
        }
    }
    else {
        generator.printOnNewline(name);
        if (isInput && isNullable) {
            generator.print('?');
        }
        generator.print(`: ${typeName || types_1.typeNameFromGraphQLType(generator.context, type)}`);
    }
    generator.print(',');
}
exports.propertyDeclaration = propertyDeclaration;
function propertySetsDeclaration(generator, property, propertySets, standalone = false) {
    const { description, fieldName, propertyName, typeName, isNullable, isArray, isArrayElementNullable } = property;
    const name = fieldName || propertyName;
    if (description) {
        description.split('\n')
            .forEach(line => {
            generator.printOnNewline(`// ${line.trim()}`);
        });
    }
    if (!standalone) {
        generator.printOnNewline(`${name}:`);
    }
    if (isNullable) {
        generator.print(' ?');
    }
    if (isArray) {
        generator.print('Array< ');
        if (isArrayElementNullable) {
            generator.print('?');
        }
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
        generator.print(' >');
    }
    if (!standalone) {
        generator.print(',');
    }
}
exports.propertySetsDeclaration = propertySetsDeclaration;
//# sourceMappingURL=language.js.map