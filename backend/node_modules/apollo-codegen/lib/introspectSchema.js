"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const graphql_1 = require("graphql");
const utilities_1 = require("graphql/utilities");
const errors_1 = require("./errors");
function introspect(schemaContents) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = graphql_1.buildASTSchema(graphql_1.parse(schemaContents), { commentDescriptions: true });
        return yield graphql_1.graphql(schema, utilities_1.introspectionQuery);
    });
}
exports.introspect = introspect;
function introspectSchema(schemaPath, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.existsSync(schemaPath)) {
            throw new errors_1.ToolError(`Cannot find GraphQL schema file: ${schemaPath}`);
        }
        const schemaContents = fs.readFileSync(schemaPath).toString();
        const result = yield introspect(schemaContents);
        if (result.errors) {
            throw new errors_1.ToolError(`Errors in introspection query result: ${result.errors}`);
        }
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    });
}
exports.default = introspectSchema;
//# sourceMappingURL=introspectSchema.js.map