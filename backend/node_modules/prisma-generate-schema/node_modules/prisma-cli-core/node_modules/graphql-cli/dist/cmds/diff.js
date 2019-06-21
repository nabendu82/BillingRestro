"use strict";
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
exports.command = 'diff';
exports.describe = 'Show a diff between two schemas';
var path_1 = require("path");
var chalk_1 = require("chalk");
var graphql_1 = require("graphql");
var disparity = require("disparity");
var _1 = require("../");
// FIXME: remove when https://github.com/graphql/graphql-js/pull/965 is merged
var findDangerousChanges = require('graphql/utilities/findBreakingChanges').findDangerousChanges;
exports.builder = function (yargs) {
    yargs
        .alias('e', 'endpoint')
        .describe('e', 'Endpoint name')
        .string('e')
        .alias('t', 'target')
        .describe('t', 'Target endpoint name')
        .string('t')
        .example('graphql diff -e dev -t prod', 'show schema diff between "dev" and "prod" endpoints')
        .example('graphql diff -e dev', 'show schema diff between "dev" and local saved schema');
};
function handler(context, argv) {
    return __awaiter(this, void 0, void 0, function () {
        var config, endpoint, fromDesc, fromSchema, toSchema, toDesc, target, fromSDL, toSDL, diff, dangerousChanges, _i, dangerousChanges_1, change, breakingChanges, _a, breakingChanges_1, change;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, context.getProjectConfig()];
                case 1:
                    config = _b.sent();
                    if (!config.endpointsExtension) {
                        throw _1.noEndpointError;
                    }
                    endpoint = config.endpointsExtension.getEndpoint(argv.endpoint);
                    fromDesc = argv.endpoint + " (" + endpoint.url + ")";
                    return [4 /*yield*/, endpoint.resolveSchema()];
                case 2:
                    fromSchema = _b.sent();
                    if (!argv.target) return [3 /*break*/, 4];
                    target = config.endpointsExtension.getEndpoint(argv.target);
                    toDesc = argv.target + " (" + target.url + ")";
                    return [4 /*yield*/, target.resolveSchema()];
                case 3:
                    toSchema = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    toDesc = path_1.relative(process.cwd(), config.schemaPath);
                    toSchema = config.getSchema();
                    _b.label = 5;
                case 5:
                    fromSDL = graphql_1.printSchema(fromSchema);
                    toSDL = graphql_1.printSchema(toSchema);
                    if (fromSDL === toSDL) {
                        console.log(chalk_1.default.green('✔ No changes'));
                        return [2 /*return*/];
                    }
                    diff = disparity.unified(fromSDL, toSDL, { paths: [fromDesc, toDesc] });
                    console.log(diff);
                    dangerousChanges = findDangerousChanges(fromSchema, toSchema);
                    if (dangerousChanges.length !== 0) {
                        console.log(chalk_1.default.yellow('Dangerous changes:'));
                        for (_i = 0, dangerousChanges_1 = dangerousChanges; _i < dangerousChanges_1.length; _i++) {
                            change = dangerousChanges_1[_i];
                            console.log(chalk_1.default.yellow('  ⚠ ' + change.description));
                        }
                    }
                    breakingChanges = graphql_1.findBreakingChanges(fromSchema, toSchema);
                    if (breakingChanges.length !== 0) {
                        console.log(chalk_1.default.red('BREAKING CHANGES:'));
                        for (_a = 0, breakingChanges_1 = breakingChanges; _a < breakingChanges_1.length; _a++) {
                            change = breakingChanges_1[_a];
                            console.log(chalk_1.default.red('  ✖ ' + change.description));
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.handler = handler;
//# sourceMappingURL=diff.js.map