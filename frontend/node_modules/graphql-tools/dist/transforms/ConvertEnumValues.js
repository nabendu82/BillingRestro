Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var visitSchema_1 = require("../transforms/visitSchema");
// Transformation used to modifiy `GraphQLEnumType` values in a schema.
var ConvertEnumValues = /** @class */ (function () {
    function ConvertEnumValues(enumValueMap) {
        this.enumValueMap = enumValueMap;
    }
    // Walk a schema looking for `GraphQLEnumType` types. If found, and
    // matching types have been identified in `this.enumValueMap`, create new
    // `GraphQLEnumType` types using the `this.enumValueMap` specified new
    // values, and return them in the new schema.
    ConvertEnumValues.prototype.transformSchema = function (schema) {
        var _a;
        var enumValueMap = this.enumValueMap;
        if (!enumValueMap || Object.keys(enumValueMap).length === 0) {
            return schema;
        }
        var transformedSchema = visitSchema_1.visitSchema(schema, (_a = {},
            _a[visitSchema_1.VisitSchemaKind.ENUM_TYPE] = function (enumType) {
                var externalToInternalValueMap = enumValueMap[enumType.name];
                if (externalToInternalValueMap) {
                    var values = enumType.getValues();
                    var newValues_1 = {};
                    values.forEach(function (value) {
                        var newValue = Object.keys(externalToInternalValueMap).includes(value.name)
                            ? externalToInternalValueMap[value.name]
                            : value.name;
                        newValues_1[value.name] = {
                            value: newValue,
                            deprecationReason: value.deprecationReason,
                            description: value.description,
                            astNode: value.astNode,
                        };
                    });
                    return new graphql_1.GraphQLEnumType({
                        name: enumType.name,
                        description: enumType.description,
                        astNode: enumType.astNode,
                        values: newValues_1,
                    });
                }
                return enumType;
            },
            _a));
        // `GraphQLEnumType`'s in `graphql-js` 14.x currently use an internal
        // `_valueLookup` map to associate enum values with the enums
        // themselves, when doing an enum lookup. To support `graphql-tools`
        // internal enum values functionality however, we have to change the
        // enum value used as the key in the `_valueLookup` map, to be the new
        // internal only enum value. The code above accomplishes this by
        // creating a new `GraphQLEnumType` with the internal enum value as the
        // enum value. Unfortunately, doing this breaks the way scheam delegation
        // works in `graphql-tools`, since delegation can no longer look an enum
        // up by its original external facing value. To accommodate this,
        // here we're switching the enums value back to its original external
        // facing value. So `_valueLookup` stays as we want it - with the new
        // enum value as the key in the lookup map, but the defined enum values
        // array is now back to the way it was, with only external facing values.
        var schemaTypeMap = transformedSchema.getTypeMap();
        Object.keys(enumValueMap).forEach(function (enumTypeName) {
            var enumType = schemaTypeMap[enumTypeName];
            if (enumType) {
                enumType.getValues().forEach(function (value) {
                    value.value = value.name;
                });
            }
        });
        return transformedSchema;
    };
    return ConvertEnumValues;
}());
exports.default = ConvertEnumValues;
//# sourceMappingURL=ConvertEnumValues.js.map