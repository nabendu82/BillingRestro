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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var express = require("express");
var requestProxy = require("express-request-proxy");
var fs = require("fs");
var graphql_playground_middleware_express_1 = require("graphql-playground-middleware-express");
var opn = require("opn");
var _1 = require("../");
exports.command = 'playground';
exports.describe = 'Open interactive GraphQL Playground';
exports.builder = {
    port: {
        description: 'port to start local server with voyager on',
    },
    endpoint: {
        alias: 'e',
        describe: 'Endpoint name',
        type: 'string',
    },
    web: {
        alias: 'w',
        describe: 'Open web version (even if desktop app available)',
        type: 'boolean',
    },
    'server-only': {
        describe: 'Run only server',
        type: 'boolean',
        default: false,
    },
};
var startServer = function (_a) {
    var context = _a.context, endpoint = _a.endpoint, _b = _a.port, port = _b === void 0 ? 3000 : _b;
    return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var app, config, projects, projectConfig, _a, url, headers, listener;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                app = express();
                                return [4 /*yield*/, context.getConfig()];
                            case 1:
                                config = _b.sent();
                                projects = config.getProjects();
                                if (!(projects === undefined)) return [3 /*break*/, 3];
                                return [4 /*yield*/, context.getProjectConfig()];
                            case 2:
                                projectConfig = _b.sent();
                                if (!projectConfig.endpointsExtension) {
                                    throw _1.noEndpointError;
                                }
                                _a = projectConfig.endpointsExtension.getEndpoint(endpoint), url = _a.url, headers = _a.headers;
                                app.use('/graphql', requestProxy({
                                    url: url,
                                    headers: headers,
                                }));
                                app.use('/playground', graphql_playground_middleware_express_1.default({
                                    endpoint: '/graphql',
                                    config: config.config,
                                }));
                                return [3 /*break*/, 4];
                            case 3:
                                app.use('/playground', graphql_playground_middleware_express_1.default({ config: config.config }));
                                _b.label = 4;
                            case 4:
                                listener = app.listen(port, function () {
                                    var host = listener.address().address;
                                    if (host === '::') {
                                        host = 'localhost';
                                    }
                                    var link = "http://" + host + ":" + port + "/playground";
                                    console.log('Serving playground at %s', chalk_1.default.blue(link));
                                    resolve(link);
                                });
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
};
function handler(context, argv) {
    return __awaiter(this, void 0, void 0, function () {
        var localPlaygroundPath, isLocalPlaygroundAvailable, shouldStartServer, shouldOpenBrowser, link, envPath, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localPlaygroundPath = "/Applications/GraphQL Playground.app/Contents/MacOS/GraphQL Playground";
                    isLocalPlaygroundAvailable = fs.existsSync(localPlaygroundPath);
                    shouldStartServer = argv.serverOnly || argv.web || !isLocalPlaygroundAvailable;
                    shouldOpenBrowser = !argv.serverOnly;
                    if (!shouldStartServer) return [3 /*break*/, 2];
                    return [4 /*yield*/, startServer({
                            context: context,
                            endpoint: argv.endpoint,
                            port: argv.port,
                        })];
                case 1:
                    link = _a.sent();
                    if (shouldOpenBrowser) {
                        opn(link);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    envPath = _1.getTmpPath();
                    fs.writeFileSync(envPath, JSON.stringify(process.env));
                    url = "graphql-playground://?cwd=" + process.cwd() + "&envPath=" + envPath;
                    opn(url, { wait: false });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.handler = handler;
//# sourceMappingURL=playground.js.map