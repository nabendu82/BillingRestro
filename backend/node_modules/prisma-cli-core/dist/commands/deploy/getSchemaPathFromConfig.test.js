"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getSchemaPathFromConfig_1 = require("./getSchemaPathFromConfig");
describe('getSchemaPathFromConfig', function () {
    test('graphqlconfig config with prisma project in toplevel', function () {
        var schemaPath = getSchemaPathFromConfig_1.getSchemaPathFromConfig(__dirname + '/fixtures/toplevel-config');
        expect(schemaPath).toBe('toplevel-schema.graphql');
    });
    test('graphqlconfig config with prisma project not called database', function () {
        var schemaPath = getSchemaPathFromConfig_1.getSchemaPathFromConfig(__dirname + '/fixtures/project-config');
        expect(schemaPath).toBe('my-project-schema.graphql');
    });
});
//# sourceMappingURL=getSchemaPathFromConfig.test.js.map