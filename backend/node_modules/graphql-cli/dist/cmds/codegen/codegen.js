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
var chalk_1 = require("chalk");
var lodash_1 = require("lodash");
var npm_run_1 = require("npm-run");
var crossSpawn = require("cross-spawn");
var __1 = require("../..");
var fs = require("fs");
var graphql_1 = require("graphql");
var Codegen = /** @class */ (function () {
    function Codegen(context, argv) {
        var _this = this;
        this.context = context;
        this.argv = argv;
        this.projectDisplayName = function () { return chalk_1.default.green(_this.projectName); };
    }
    Codegen.prototype.handle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, projects, project, _i, _b, projectName, project;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.context.getConfig()
                            // Get projects
                        ];
                    case 1:
                        _a.config = _c.sent();
                        projects = this.getProjectConfig();
                        if (!this.argv.project) return [3 /*break*/, 2];
                        if (Object.keys(projects).find(function (project) { return project === _this.argv.project; })) {
                            project = projects[this.argv.project];
                            this.setCurrentProject(project, this.argv.project);
                            this.codegen();
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        _i = 0, _b = Object.keys(projects);
                        _c.label = 3;
                    case 3:
                        if (!(_i < _b.length)) return [3 /*break*/, 6];
                        projectName = _b[_i];
                        project = projects[projectName];
                        this.setCurrentProject(project, projectName);
                        return [4 /*yield*/, this.codegen()];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Codegen.prototype.setCurrentProject = function (project, projectName) {
        this.project = project;
        this.projectName = projectName;
    };
    Codegen.prototype.codegen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var codegenConfigs, _i, codegenConfigs_1, codegenConfig, output, input, generator, language, inputSchemaPath, binPath, tmpSchemaPath, _a, _b, _c, _d, _e, args, child, stderr, args, child, prismaVersionMessage, stderr;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(this.project.config.extensions &&
                            this.project.config.extensions.codegen)) return [3 /*break*/, 6];
                        this.context.spinner.start("Generating bindings for project " + this.projectDisplayName() + "...");
                        codegenConfigs = Array.isArray(this.project.config.extensions.codegen)
                            ? this.project.config.extensions.codegen
                            : [this.project.config.extensions.codegen];
                        _i = 0, codegenConfigs_1 = codegenConfigs;
                        _f.label = 1;
                    case 1:
                        if (!(_i < codegenConfigs_1.length)) return [3 /*break*/, 5];
                        codegenConfig = codegenConfigs_1[_i];
                        output = codegenConfig.output, input = codegenConfig.input, generator = codegenConfig.generator, language = codegenConfig.language;
                        inputSchemaPath = this.getInputSchemaPath(input) || this.project.schemaPath;
                        if (!inputSchemaPath && generator !== 'typegen') {
                            throw new Error("Please either provide a 'schemaPath' or 'input' for the codegen extension in your .graphqlconfig");
                        }
                        if (!output) {
                            throw new Error("Please specify the 'output' of the codegen extension in your .graphqlconfig");
                        }
                        if (!generator) {
                            throw new Error("Please specify the 'generator' of codegen extension in your .graphqlconfig");
                        }
                        if (!language) {
                            throw new Error("Please specify the 'language' of the codegen extension in your .graphqlconfig");
                        }
                        if (!(generator === 'typegen')) return [3 /*break*/, 3];
                        if (!output.typings || output.typings === '') {
                            throw new Error('Please provide output.typings path in graphql config to use typegen');
                        }
                        inputSchemaPath = inputSchemaPath || '**/*.ts';
                        binPath = require.resolve('apollo-codegen').replace('index.js', 'cli.js');
                        tmpSchemaPath = __1.getTmpPath();
                        _b = (_a = fs).writeFileSync;
                        _c = [tmpSchemaPath];
                        _e = (_d = JSON).stringify;
                        return [4 /*yield*/, introspect(this.project.getSchema())];
                    case 2:
                        _b.apply(_a, _c.concat([_e.apply(_d, [_f.sent()])]));
                        args = [
                            'generate',
                            input || '{binding,prisma}/*.ts',
                            '--schema',
                            tmpSchemaPath,
                            '--output',
                            output.typings,
                            '--target',
                            language,
                        ];
                        child = crossSpawn.sync(binPath, args);
                        if (child.error) {
                            if (child.error.message === "spawnSync apollo-codegen ENOENT") {
                                throw new Error("Generator apollo-codegen is not installed.");
                            }
                            throw new Error(child.error.message);
                        }
                        stderr = child.stderr && child.stderr.toString();
                        if (stderr && stderr.length > 0) {
                            throw new Error(child.stderr.toString());
                        }
                        this.context.spinner.succeed("Typedefs for project " + this.projectDisplayName() + " generated to " + chalk_1.default.green(output.typings));
                        return [3 /*break*/, 4];
                    case 3:
                        args = ['--input', inputSchemaPath, '--language', language];
                        if (!output.binding || output.binding === '' && !output.typeDefs || output.typeDefs === '') {
                            throw new Error('Please provide either output.binding or output.typeDefs in graphql config to use this generator');
                        }
                        if (output.binding) {
                            args.push('--outputBinding', output.binding);
                        }
                        if (output.typeDefs) {
                            args.push('--outputTypedefs', output.typeDefs);
                        }
                        child = npm_run_1.spawnSync(generator, args);
                        if (child.error) {
                            if (child.error.message === "spawnSync " + generator + " ENOENT") {
                                prismaVersionMessage = generator === 'prisma-binding' || 'graphql-binding' ?
                                    "Please install " + generator + " version > 2.x to use \"graphql codegen\"" : '';
                                throw new Error("Generator " + generator + " is not installed. " + prismaVersionMessage);
                            }
                            throw new Error(child.error.message);
                        }
                        stderr = child.stderr && child.stderr.toString();
                        if (stderr && stderr.length > 0) {
                            throw new Error(stderr);
                        }
                        this.context.spinner.succeed("Code for project " + this.projectDisplayName() + " generated to " + chalk_1.default.green(output.binding) + (output.typeDefs
                            ? ". Typedefs written to " + chalk_1.default.green(output.typeDefs)
                            : ''));
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (this.argv.verbose) {
                            this.context.spinner.info("Codegen not configured for project " + this.projectDisplayName() + ". Skipping");
                        }
                        _f.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Codegen.prototype.getInputSchemaPath = function (input) {
        if (!input) {
            return null;
        }
        if (typeof input === 'string') {
            return input;
        }
        return input.schema;
    };
    Codegen.prototype.getProjectConfig = function () {
        var _this = this;
        var projects;
        if (this.argv.project) {
            if (Array.isArray(this.argv.project)) {
                projects = {};
                this.argv.project.map(function (p) {
                    return lodash_1.merge(projects, (_a = {}, _a[p] = _this.config.getProjectConfig(p), _a));
                    var _a;
                });
            }
            else {
                // Single project mode
                projects = (_a = {},
                    _a[this.argv.project] = this.config.getProjectConfig(this.argv.project),
                    _a);
            }
        }
        else {
            // Process all projects
            projects = this.config.getProjects();
        }
        return projects || { default: this.config.getProjectConfig() };
        var _a;
    };
    return Codegen;
}());
exports.Codegen = Codegen;
function introspect(schema) {
    return graphql_1.graphql(schema, graphql_1.introspectionQuery);
}
exports.introspect = introspect;
//# sourceMappingURL=codegen.js.map