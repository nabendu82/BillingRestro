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
exports.command = 'init';
exports.describe = 'Setup .graphqlconfig file';
var path_1 = require("path");
var fs_1 = require("fs");
var yaml = require("js-yaml");
var chalk_1 = require("chalk");
var graphql_config_1 = require("graphql-config");
function handler(context) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, projectName, config, extensionEndpoints, finalConfig, configFormat, configFilename, configData, confirmSave, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    prompt = context.prompt;
                    return [4 /*yield*/, prompt({
                            type: 'input',
                            name: 'projectName',
                            message: 'Enter project name (Enter to skip):'
                        })];
                case 1:
                    projectName = (_b.sent()).projectName;
                    return [4 /*yield*/, prompt({
                            type: 'input',
                            name: 'schemaPath',
                            message: "Local schema file path:",
                            default: 'schema.graphql',
                            validate: function (schemaPath) {
                                var parentDir = path_1.dirname(schemaPath);
                                if (!fs_1.existsSync(parentDir)) {
                                    return "Parent dir doesn't exists: " + parentDir;
                                }
                                if (!schemaPath.endsWith('.json') && !schemaPath.endsWith('.graphql')) {
                                    return "Please specify extension '*.json' for introspection or '*.graphql' for SDL";
                                }
                                return true;
                            },
                        })];
                case 2:
                    config = _b.sent();
                    extensionEndpoints = {};
                    _b.label = 3;
                case 3: return [4 /*yield*/, addEndpoint(prompt, extensionEndpoints)];
                case 4:
                    if (!_b.sent()) return [3 /*break*/, 5];
                    return [3 /*break*/, 3];
                case 5:
                    if (Object.keys(extensionEndpoints).length !== 0) {
                        config.extensions = {
                            endpoints: extensionEndpoints,
                        };
                    }
                    finalConfig = config;
                    if (projectName) {
                        finalConfig = { projects: (_a = {},
                                _a[projectName] = config,
                                _a) };
                    }
                    return [4 /*yield*/, prompt({
                            type: 'list',
                            name: 'configFormat',
                            message: 'What format do you want to save your config in?',
                            choices: ['JSON', 'YAML'],
                            default: 'JSON',
                        })];
                case 6:
                    configFormat = (_b.sent()).configFormat;
                    configFilename = path_1.resolve(configFormat === 'JSON' ? graphql_config_1.GRAPHQL_CONFIG_NAME : graphql_config_1.GRAPHQL_CONFIG_YAML_NAME);
                    configData = configFormat === 'JSON' ?
                        JSON.stringify(finalConfig, null, 2) :
                        yaml.safeDump(finalConfig);
                    console.log("\nAbout to write to " + chalk_1.default.blue(configFilename) + ":\n\n" +
                        chalk_1.default.yellow(configData) + '\n');
                    return [4 /*yield*/, prompt({
                            type: 'confirm',
                            name: 'confirmSave',
                            message: "Is this ok?",
                            default: true,
                        })];
                case 7:
                    confirmSave = (_b.sent()).confirmSave;
                    if (confirmSave) {
                        fs_1.writeFileSync(configFilename, configData, 'utf-8');
                    }
                    else {
                        console.log('Aborted.');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.handler = handler;
function addEndpoint(prompt, extensionEndpoints) {
    return __awaiter(this, void 0, void 0, function () {
        var url, name, endpoint, subscriptionUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompt({
                        name: 'url',
                        type: 'input',
                        message: 'Endpoint URL (Enter to skip):',
                        validate: function (url) {
                            if (url === '') {
                                return true;
                            }
                            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                                return 'URL should start with either "http://" or "https://"';
                            }
                            return true;
                        },
                    })];
                case 1:
                    url = (_a.sent()).url;
                    if (url === '') {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, prompt({
                            type: 'input',
                            name: 'name',
                            message: 'Name of this endpoint, for e.g. default, dev, prod:',
                            default: function () {
                                return extensionEndpoints['default'] ? undefined : 'default';
                            },
                            validate: function (name) {
                                if (name === '') {
                                    return "You can't use empty string as a name.";
                                }
                                if (extensionEndpoints[name] !== undefined) {
                                    return "You already used '" + name + "' name for different endpoint.";
                                }
                                return true;
                            },
                        })];
                case 2:
                    name = (_a.sent()).name;
                    endpoint = { url: url };
                    return [4 /*yield*/, prompt({
                            type: 'input',
                            name: 'subscriptionUrl',
                            message: 'Subscription URL (Enter to skip):',
                        })];
                case 3:
                    subscriptionUrl = (_a.sent()).subscriptionUrl;
                    if (subscriptionUrl !== '') {
                        endpoint.subscription = subscriptionUrl;
                    }
                    if (Object.keys(endpoint).length === 1) {
                        endpoint = endpoint.url;
                    }
                    extensionEndpoints[name] = endpoint;
                    return [4 /*yield*/, prompt({
                            type: 'confirm',
                            name: 'continue',
                            message: 'Do you want to add other endpoints?',
                            default: false,
                        })];
                case 4: return [2 /*return*/, (_a.sent()).continue];
            }
        });
    });
}
exports.addEndpoint = addEndpoint;
//# sourceMappingURL=init.js.map