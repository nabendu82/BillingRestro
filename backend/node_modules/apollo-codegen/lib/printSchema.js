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
const errors_1 = require("./errors");
function printSchemaFromIntrospectionResult(schemaPath, outputPath, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.existsSync(schemaPath)) {
            throw new errors_1.ToolError(`Cannot find GraphQL schema file: ${schemaPath}`);
        }
        const schemaJSON = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        if (!schemaJSON.data) {
            throw new errors_1.ToolError(`No introspection query result data found in: ${schemaPath}`);
        }
        const schema = graphql_1.buildClientSchema(schemaJSON.data);
        const schemaIDL = graphql_1.printSchema(schema, options);
        if (outputPath) {
            fs.writeFileSync(outputPath, schemaIDL);
        }
        else {
            console.log(schemaIDL);
        }
    });
}
exports.default = printSchemaFromIntrospectionResult;
//# sourceMappingURL=printSchema.js.map