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
var CLI_1 = require("./CLI");
jest.unmock('fs-extra');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
function run() {
    var argv = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argv[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var cli, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cli = new CLI_1.CLI({ config: { argv: ['prisma'].concat(argv), mock: true } });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cli.run()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, cli];
                case 3:
                    err_1 = _a.sent();
                    if (err_1.code !== 0) {
                        throw err_1;
                    }
                    return [2 /*return*/, cli];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// test('runs the version command', async () => {
//   expect.assertions(1)
//   const cli = new CLI({config: {argv: ['prisma', 'version'], mock: true}})
//   try {
//     await cli.run()
//   } catch (err) {
//     expect(err.code).toBe(0)
//   }
// })
//
// test('errors with invalid arguments', async () => {
//   expect.assertions(1)
//   const cli = new CLI({config: {argv: ['prisma', 'version', '--invalid-flag'], mock: true}})
//   try {
//     await cli.run()
//   } catch (err) {
//     expect(err.message).toContain('Unexpected argument --invalid-flag')
//   }
// })
//
// test('errors when command not found', async () => {
//   expect.assertions(1)
//   const cli = new CLI({config: {argv: ['prisma', 'foobar12345'], mock: true}})
//   try {
//     await cli.run()
//   } catch (err) {
//     if (!err.code) {
//       throw err
//     }
//     expect(err.code).toEqual(127)
//   }
// })
describe('edge cases', function () {
    test('shows help for `help` command itself', function () { return __awaiter(_this, void 0, void 0, function () {
        var cli;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, run('help')];
                case 1:
                    cli = _a.sent();
                    expect(cli.cmd.out.stdout.output).toMatch(/Usage: prisma COMMAND/);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('cli help', function () {
    describe('global help', function () {
        var globalHelpOutput = /^Usage: \S+ COMMAND/m;
        test('shows help when no arguments given', function () { return __awaiter(_this, void 0, void 0, function () {
            var cli;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, run()];
                    case 1:
                        cli = _a.sent();
                        expect(cli.cmd.out.stdout.output).toMatch(globalHelpOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        test('shows help for `help` command and no additonal arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var cli;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, run('help')];
                    case 1:
                        cli = _a.sent();
                        expect(cli.cmd.out.stdout.output).toMatch(globalHelpOutput);
                        return [2 /*return*/];
                }
            });
        }); });
        test('shows help for `--help` or `-h` flag and no additonal arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var cli, clid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, run('--help')];
                    case 1:
                        cli = _a.sent();
                        return [4 /*yield*/, run('-h')];
                    case 2:
                        clid = _a.sent();
                        expect(cli.cmd.out.stdout.output).toMatch(globalHelpOutput);
                        expect(clid.cmd.out.stdout.output).toMatch(globalHelpOutput);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe('cli version', function () {
    test('-v', function () { return __awaiter(_this, void 0, void 0, function () {
        var cli;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, run('-v')];
                case 1:
                    cli = _a.sent();
                    expect(cli.cmd.out.stdout.output).toContain('prisma/');
                    return [2 /*return*/];
            }
        });
    }); });
    test('--version', function () { return __awaiter(_this, void 0, void 0, function () {
        var cli;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, run('--version')];
                case 1:
                    cli = _a.sent();
                    expect(cli.cmd.out.stdout.output).toContain('prisma/');
                    return [2 /*return*/];
            }
        });
    }); });
    test('version', function () { return __awaiter(_this, void 0, void 0, function () {
        var cli;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, run('version')];
                case 1:
                    cli = _a.sent();
                    expect(cli.cmd.out.stdout.output).toContain('prisma/');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=CLI.test.js.map