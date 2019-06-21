"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
function makePartsEnclodesByCharacterBold(str, character) {
    var components = str.split(character);
    for (var i = 0; i < components.length; i++) {
        if (i % 2 === 1) {
            components[i] = chalk_1.default.bold(components[i]);
        }
    }
    return components.join(chalk_1.default.bold("`"));
}
exports.makePartsEnclodesByCharacterBold = makePartsEnclodesByCharacterBold;
function regionEnumToOption(regionEnum) {
    return regionEnum.toLowerCase().replace(/_/g, '-');
}
exports.regionEnumToOption = regionEnumToOption;
//# sourceMappingURL=util.js.map