"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printing_1 = require("../utilities/printing");
function escapedString(string) {
    return string.replace(/"/g, '\\"');
}
exports.escapedString = escapedString;
function multilineString(context, string) {
    const lines = string.split('\n');
    lines.forEach((line, index) => {
        const isLastLine = index != lines.length - 1;
        context.printOnNewline(`"${escapedString(line)}"` + (isLastLine ? ' +' : ''));
    });
}
exports.multilineString = multilineString;
function dictionaryLiteralForFieldArguments(args) {
    function expressionFromValue(value) {
        if (value.kind === 'Variable') {
            return `Variable("${value.variableName}")`;
        }
        else if (Array.isArray(value)) {
            return printing_1.wrap('[', printing_1.join(value.map(expressionFromValue), ', '), ']');
        }
        else if (typeof value === 'object') {
            return printing_1.wrap('[', printing_1.join(Object.entries(value).map(([key, value]) => {
                return `"${key}": ${expressionFromValue(value)}`;
            }), ', ') || ':', ']');
        }
        else {
            return JSON.stringify(value);
        }
    }
    return printing_1.wrap('[', printing_1.join(args.map(arg => {
        return `"${arg.name}": ${expressionFromValue(arg.value)}`;
    }), ', ') || ':', ']');
}
exports.dictionaryLiteralForFieldArguments = dictionaryLiteralForFieldArguments;
//# sourceMappingURL=values.js.map