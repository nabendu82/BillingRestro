/* eslint-disable no-await-in-loop */
/* tslint:disable */
'use strict';
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
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require('inquirer');
var isNumber = function (i) { return typeof i === 'number'; };
var isFunction = function (i) { return typeof i === 'function'; };
var isUndefined = function (i) { return typeof i === 'undefined'; };
/**
 * @param  {Object} prompt
 * @param  {Object} answers
 * @param  {string} input
 * @return {Promise.<string|string[]|Object>}
 */
function promptHandler(prompt, answers, input) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, answer, _b, valid;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (prompt.when === false) {
                        return [2 /*return*/];
                    }
                    _a = isFunction(prompt.when);
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, prompt.when(answers)];
                case 1:
                    _a = !(_c.sent());
                    _c.label = 2;
                case 2:
                    if (_a) {
                        return [2 /*return*/];
                    }
                    if (isFunction(prompt.message)) {
                        // Just for coverage
                        prompt.message(answers);
                    }
                    if (isFunction(prompt.transformer)) {
                        // Just for coverage
                        prompt.message(input);
                    }
                    answer = input;
                    if (!isUndefined(answer)) return [3 /*break*/, 8];
                    if (!isFunction(prompt.default)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prompt.default(answers)];
                case 3:
                    answer = _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    answer = prompt.default;
                    _c.label = 5;
                case 5:
                    if (!(isNumber(answer) && prompt.type in ['list', 'rawlist', 'expand'])) return [3 /*break*/, 8];
                    if (!isFunction(prompt.choiches)) return [3 /*break*/, 7];
                    return [4 /*yield*/, prompt.choiches(answers)[answer]];
                case 6:
                    answer = _c.sent();
                    return [3 /*break*/, 8];
                case 7:
                    answer = prompt.choiches[answer];
                    _c.label = 8;
                case 8:
                    if (!isUndefined(answer)) return [3 /*break*/, 16];
                    _b = prompt.type;
                    switch (_b) {
                        case 'expand': return [3 /*break*/, 9];
                        case 'checkbox': return [3 /*break*/, 10];
                        case 'confirm': return [3 /*break*/, 11];
                    }
                    return [3 /*break*/, 12];
                case 9:
                    answer = {
                        key: 'h',
                        name: 'Help, list all options',
                        value: 'help',
                    };
                    return [3 /*break*/, 16];
                case 10:
                    answer = [];
                    return [3 /*break*/, 16];
                case 11:
                    answer = false;
                    return [3 /*break*/, 16];
                case 12:
                    if (!Array.isArray(prompt.choiches)) return [3 /*break*/, 13];
                    ;
                    answer = prompt.choiches[0];
                    return [3 /*break*/, 16];
                case 13:
                    if (!isFunction(prompt.choiches)) return [3 /*break*/, 15];
                    ;
                    return [4 /*yield*/, prompt.choiches(answers)];
                case 14:
                    answer = (_c.sent())[0];
                    return [3 /*break*/, 16];
                case 15:
                    answer = '';
                    _c.label = 16;
                case 16:
                    if (!isFunction(prompt.filter)) return [3 /*break*/, 18];
                    return [4 /*yield*/, prompt.filter(answer)];
                case 17:
                    answer = _c.sent();
                    _c.label = 18;
                case 18:
                    if (!isFunction(prompt.validate)) return [3 /*break*/, 20];
                    return [4 /*yield*/, prompt.validate(answer, answers)];
                case 19:
                    valid = _c.sent();
                    if (valid !== true) {
                        throw new Error(valid);
                    }
                    _c.label = 20;
                case 20: return [2 /*return*/, answer];
            }
        });
    });
}
/**
 * @param  {Object} inputs
 * @return {Function}
 */
function inquirerHandler(inputs) {
    var _this = this;
    /**
     * @param  {Object} prompts
     * @return {Promise.<Object>}
     */
    return function (prompts) { return __awaiter(_this, void 0, void 0, function () {
        var answers, _i, _a, prompt_1, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    answers = {};
                    _i = 0, _a = [].concat(prompts);
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    prompt_1 = _a[_i];
                    _b = answers;
                    _c = prompt_1.name;
                    return [4 /*yield*/, promptHandler(prompt_1, answers, inputs[prompt_1.name])];
                case 2:
                    _b[_c] = _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, answers];
            }
        });
    }); };
}
/**
 * @param  {Object|Object[]} inputs
 */
function mocki(inputs) {
    if (typeof inputs !== 'object') {
        throw new TypeError('The mocked answers must be an objects.');
    }
    var promptOriginal = inquirer.prompt;
    var promptMock = function (questions) {
        return __awaiter(this, void 0, void 0, function () {
            var answers, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, inquirerHandler(inputs)(questions)];
                    case 1:
                        answers = _a.sent();
                        inquirer.prompt = promptOriginal;
                        return [2 /*return*/, Promise.resolve(answers)];
                    case 2:
                        err_1 = _a.sent();
                        inquirer.prompt = promptOriginal;
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    promptMock.prompts = inquirer.prompt.prompts;
    promptMock.registerPrompt = inquirer.prompt.registerPrompt;
    promptMock.restoreDefaultPrompts = inquirer.prompt.restoreDefaultPrompts;
    // inquirer.prompt = promptMock
    // return inquirer
    return {
        prompt: promptMock,
    };
}
exports.mocki = mocki;
//# sourceMappingURL=inquirer-mock-prompt.js.map