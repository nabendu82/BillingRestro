Object.defineProperty(exports, "__esModule", { value: true });
var newExtensionDefinitionKind = 'ObjectTypeExtension';
var interfaceExtensionDefinitionKind = 'InterfaceTypeExtension';
var inputObjectExtensionDefinitionKind = 'InputObjectTypeExtension';
function extractExtensionDefinitions(ast) {
    var extensionDefs = ast.definitions.filter(function (def) {
        return def.kind === newExtensionDefinitionKind ||
            def.kind === interfaceExtensionDefinitionKind ||
            def.kind === inputObjectExtensionDefinitionKind;
    });
    return Object.assign({}, ast, {
        definitions: extensionDefs,
    });
}
exports.default = extractExtensionDefinitions;
//# sourceMappingURL=extractExtensionDefinitions.js.map