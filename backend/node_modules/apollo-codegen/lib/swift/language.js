"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CodeGenerator_1 = require("../utilities/CodeGenerator");
const printing_1 = require("../utilities/printing");
function escapedString(string) {
    return string.replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
exports.escapedString = escapedString;
const reservedKeywords = new Set(['associatedtype', 'class', 'deinit', 'enum', 'extension',
    'fileprivate', 'func', 'import', 'init', 'inout', 'internal', 'let', 'open',
    'operator', 'private', 'protocol', 'public', 'static', 'struct', 'subscript',
    'typealias', 'var', 'break', 'case', 'continue', 'default', 'defer', 'do',
    'else', 'fallthrough', 'for', 'guard', 'if', 'in', 'repeat', 'return',
    'switch', 'where', 'while', 'as', 'Any', 'catch', 'false', 'is', 'nil',
    'rethrows', 'super', 'self', 'Self', 'throw', 'throws', 'true', 'try',
    'associativity', 'convenience', 'dynamic', 'didSet', 'final', 'get', 'infix',
    'indirect', 'lazy', 'left', 'mutating', 'none', 'nonmutating', 'optional',
    'override', 'postfix', 'precedence', 'prefix', 'Protocol', 'required', 'right',
    'set', 'Type', 'unowned', 'weak', 'willSet']);
function escapeIdentifierIfNeeded(identifier) {
    if (reservedKeywords.has(identifier)) {
        return '`' + identifier + '`';
    }
    else {
        return identifier;
    }
}
exports.escapeIdentifierIfNeeded = escapeIdentifierIfNeeded;
class SwiftGenerator extends CodeGenerator_1.default {
    constructor(context) {
        super(context);
    }
    multilineString(string) {
        this.printOnNewline(`"${escapedString(string)}"`);
    }
    comment(comment) {
        comment &&
            comment.split('\n').forEach(line => {
                this.printOnNewline(`/// ${line.trim()}`);
            });
    }
    deprecationAttributes(isDeprecated, deprecationReason) {
        if (isDeprecated !== undefined && isDeprecated) {
            deprecationReason = (deprecationReason !== undefined && deprecationReason.length > 0) ? deprecationReason : "";
            this.printOnNewline(`@available(*, deprecated, message: "${escapedString(deprecationReason)}")`);
        }
    }
    namespaceDeclaration(namespace, closure) {
        if (namespace) {
            this.printNewlineIfNeeded();
            this.printOnNewline(`/// ${namespace} namespace`);
            this.printOnNewline(`public enum ${namespace}`);
            this.pushScope({ typeName: namespace });
            this.withinBlock(closure);
            this.popScope();
        }
        else {
            if (closure) {
                closure();
            }
        }
    }
    namespaceExtensionDeclaration(namespace, closure) {
        if (namespace) {
            this.printNewlineIfNeeded();
            this.printOnNewline(`/// ${namespace} namespace`);
            this.printOnNewline(`public extension ${namespace}`);
            this.pushScope({ typeName: namespace });
            this.withinBlock(closure);
            this.popScope();
        }
        else {
            if (closure) {
                closure();
            }
        }
    }
    classDeclaration({ className, modifiers, superClass, adoptedProtocols = [] }, closure) {
        this.printNewlineIfNeeded();
        this.printOnNewline(printing_1.wrap('', printing_1.join(modifiers, ' '), ' ') + `class ${className}`);
        this.print(printing_1.wrap(': ', printing_1.join([superClass, ...adoptedProtocols], ', ')));
        this.pushScope({ typeName: className });
        this.withinBlock(closure);
        this.popScope();
    }
    structDeclaration({ structName, description, adoptedProtocols = [] }, closure) {
        this.printNewlineIfNeeded();
        this.comment(description);
        this.printOnNewline(`public struct ${escapeIdentifierIfNeeded(structName)}`);
        this.print(printing_1.wrap(': ', printing_1.join(adoptedProtocols, ', ')));
        this.pushScope({ typeName: structName });
        this.withinBlock(closure);
        this.popScope();
    }
    propertyDeclaration({ propertyName, typeName, description }) {
        this.comment(description);
        this.printOnNewline(`public var ${escapeIdentifierIfNeeded(propertyName)}: ${typeName}`);
    }
    propertyDeclarations(properties) {
        if (!properties)
            return;
        properties.forEach(property => this.propertyDeclaration(property));
    }
    protocolDeclaration({ protocolName, adoptedProtocols }, closure) {
        this.printNewlineIfNeeded();
        this.printOnNewline(`public protocol ${protocolName}`);
        this.print(printing_1.wrap(': ', printing_1.join(adoptedProtocols, ', ')));
        this.pushScope({ typeName: protocolName });
        this.withinBlock(closure);
        this.popScope();
    }
    protocolPropertyDeclaration({ propertyName, typeName }) {
        this.printOnNewline(`var ${propertyName}: ${typeName} { get }`);
    }
    protocolPropertyDeclarations(properties) {
        if (!properties)
            return;
        properties.forEach(property => this.protocolPropertyDeclaration(property));
    }
}
exports.SwiftGenerator = SwiftGenerator;
//# sourceMappingURL=language.js.map