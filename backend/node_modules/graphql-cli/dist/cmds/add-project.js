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
exports.command = 'add-project';
exports.desc = 'Add new project to .graphqlconfig';
var chalk_1 = require("chalk");
var init_1 = require("./init");
var lodash_1 = require("lodash");
var path_1 = require("path");
var fs_1 = require("fs");
var yaml = require("js-yaml");
function handler(context) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, getConfig, newConfig, config, existingProjectName, projectName, projectConfig, extensionEndpoints, configData, save, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    prompt = context.prompt, getConfig = context.getConfig;
                    newConfig = { projects: {} };
                    return [4 /*yield*/, getConfig()];
                case 1:
                    config = _c.sent();
                    if (!(config.config.schemaPath && !config.config.projects)) return [3 /*break*/, 3];
                    console.log(chalk_1.default.yellow('Your existing config does not use projects.'));
                    return [4 /*yield*/, prompt({
                            type: 'input',
                            name: 'existingProjectName',
                            message: 'Enter project name for existing configuration:'
                        })];
                case 2:
                    existingProjectName = (_c.sent()).existingProjectName;
                    newConfig = { projects: (_a = {},
                            _a[existingProjectName] = config.config,
                            _a)
                    };
                    return [3 /*break*/, 4];
                case 3:
                    newConfig = config.config;
                    _c.label = 4;
                case 4: return [4 /*yield*/, prompt({
                        type: 'input',
                        name: 'projectName',
                        message: 'Enter project name for new project:',
                        validate: function (answer) {
                            if (answer) {
                                if (config.getProjects() && lodash_1.has(config.getProjects(), answer)) {
                                    return chalk_1.default.red('Project name already in use!');
                                }
                                return true;
                            }
                            return false;
                        }
                    })];
                case 5:
                    projectName = (_c.sent()).projectName;
                    lodash_1.merge(newConfig, { projects: (_b = {}, _b[projectName] = {}, _b) });
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
                case 6:
                    projectConfig = _c.sent();
                    newConfig.projects[projectName] = projectConfig;
                    extensionEndpoints = {};
                    _c.label = 7;
                case 7: return [4 /*yield*/, init_1.addEndpoint(prompt, extensionEndpoints)];
                case 8:
                    if (!_c.sent()) return [3 /*break*/, 9];
                    return [3 /*break*/, 7];
                case 9:
                    if (Object.keys(extensionEndpoints).length !== 0) {
                        newConfig.projects[projectName].extensions = {
                            endpoints: extensionEndpoints,
                        };
                    }
                    if (config.configPath.endsWith('.yaml') || config.configPath.endsWith('.yml')) {
                        configData = yaml.safeDump(newConfig);
                    }
                    else {
                        configData = JSON.stringify(newConfig, null, 2);
                    }
                    console.log("\nAbout to write new configuration to " + chalk_1.default.blue(config.configPath) + ":\n\n" +
                        chalk_1.default.yellow(configData) + '\n');
                    return [4 /*yield*/, prompt({
                            type: 'confirm',
                            name: 'save',
                            message: "Is this ok?",
                            default: true,
                        })];
                case 10:
                    save = (_c.sent()).save;
                    if (save) {
                        config.saveConfig(newConfig);
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
//# sourceMappingURL=add-project.js.map