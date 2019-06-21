"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = 'schema-status';
exports.desc = 'Show source & timestamp of local schema';
var _ = require("lodash");
var chalk_1 = require("chalk");
var path_1 = require("path");
var fs_1 = require("fs");
var graphql_config_1 = require("graphql-config");
function handler(context) {
    return __awaiter(this, void 0, void 0, function () {
        var schemaPath, relativeSchemaPath, extensions, maxLength, name_1, padName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.getProjectConfig()];
                case 1:
                    schemaPath = (_a.sent()).schemaPath;
                    if (!schemaPath) {
                        throw new Error('No `schemaPath` found in GraphQL config file.');
                    }
                    relativeSchemaPath = path_1.relative(process.cwd(), schemaPath);
                    if (!fs_1.existsSync(schemaPath)) {
                        console.log(chalk_1.default.yellow("Schema file doesn't exist at ") +
                            chalk_1.default.blue(relativeSchemaPath));
                        return [2 /*return*/];
                    }
                    extensions = __assign({ schemaPath: relativeSchemaPath }, graphql_config_1.getSchemaExtensions(schemaPath));
                    maxLength = _(extensions)
                        .keys()
                        .map('length')
                        .max();
                    for (name_1 in extensions) {
                        padName = _.padStart(name_1, maxLength);
                        console.log(padName + "\t" + chalk_1.default.blue(extensions[name_1]));
                    }
                    if (Object.keys(extensions).length === 0) {
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.handler = handler;
//# sourceMappingURL=schema-status.js.map