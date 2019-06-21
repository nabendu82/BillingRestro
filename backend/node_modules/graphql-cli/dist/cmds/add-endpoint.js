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
exports.command = 'add-endpoint';
exports.desc = 'Add new endpoint to .graphqlconfig';
var chalk_1 = require("chalk");
var init_1 = require("./init");
var lodash_1 = require("lodash");
function handler(context) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, getConfig, getProjectConfig, projectConfig, extensionEndpoints, oldEndpoints, newEndpoints, newConfig, save, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = context.prompt, getConfig = context.getConfig, getProjectConfig = context.getProjectConfig;
                    return [4 /*yield*/, getProjectConfig()];
                case 1:
                    projectConfig = _a.sent();
                    extensionEndpoints = projectConfig.extensions.endpoints || {};
                    oldEndpoints = Object.keys(extensionEndpoints);
                    _a.label = 2;
                case 2: return [4 /*yield*/, init_1.addEndpoint(prompt, extensionEndpoints)];
                case 3:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [3 /*break*/, 2];
                case 4:
                    newEndpoints = lodash_1.difference(Object.keys(extensionEndpoints), oldEndpoints);
                    if (newEndpoints.length === 0) {
                        console.log(chalk_1.default.yellow("You haven't added any endpoint"));
                        return [2 /*return*/];
                    }
                    newConfig = projectConfig.config;
                    newConfig.extensions = newConfig.extensions || {};
                    newConfig.extensions.endpoints = extensionEndpoints;
                    console.log('Adding the following endpoints to your config: ', chalk_1.default.blue(newEndpoints.join(', ')));
                    return [4 /*yield*/, prompt({
                            type: 'confirm',
                            name: 'save',
                            message: "Is this ok?",
                            default: true,
                        })];
                case 5:
                    save = (_a.sent()).save;
                    if (!save) return [3 /*break*/, 7];
                    return [4 /*yield*/, getConfig()];
                case 6:
                    config = _a.sent();
                    config.saveConfig(newConfig, projectConfig.projectName);
                    return [3 /*break*/, 8];
                case 7:
                    console.log('Aborted.');
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.handler = handler;
//# sourceMappingURL=add-endpoint.js.map