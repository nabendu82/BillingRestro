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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var deploy_1 = require("./deploy");
var examples_1 = require("../../examples");
var prisma_cli_engine_1 = require("prisma-cli-engine");
var default_definition_1 = require("./nocks/default_definition");
var local_instance_1 = require("./nocks/local_instance");
var mock_client_1 = require("../../test/mock-client");
jest.mock('graphql-request');
var GraphQLClient = require('graphql-request').GraphQLClient;
GraphQLClient.mockImplementation(mock_client_1.MockGraphQLClient);
var mockEnv = {
    stages: {
        default: 'dev',
        dev: 'cj8be5ct201is0140cq7qp23b',
    },
};
var localMockEnv = {
    clusters: {
        default: 'local',
        local: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDcwMjM3NzMsImNsaWVudElkIjoiY2o4YTAxZHN1MDAwMDAxMjM1aWF1aTFoYiJ9.WscmbACu0HqPEDSk_U66TNOskGddmt2plJAew6XCyNw',
            host: 'http://localhost:4466',
        },
    },
};
describe.skip('deploy', function () {
    test('from empty to default definition', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    default_definition_1.default();
                    return [4 /*yield*/, deploy_1.default.mock({ mockEnv: mockEnv, mockDefinition: prisma_cli_engine_1.mockDefinition })];
                case 1:
                    result = _a.sent();
                    expect(result.out.stdout.output).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip('to local instance', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    local_instance_1.default();
                    return [4 /*yield*/, deploy_1.default.mock({
                            mockDefinition: examples_1.changedDefaultDefinition,
                            mockEnv: localMockEnv,
                        }, '-n', 'servicename2', '-c', 'local')];
                case 1:
                    result = _a.sent();
                    expect(result.out.stdout.output).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.test.js.map