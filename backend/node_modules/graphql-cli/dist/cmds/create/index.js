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
var Zip = require("adm-zip");
var chalk_1 = require("chalk");
var commandExists = require("command-exists");
var gh = require("parse-github-url");
var cross_spawn_1 = require("cross-spawn");
var fs = require("fs");
var lodash_1 = require("lodash");
var path = require("path");
var request = require("request");
var tmp = require("tmp");
var rimraf = require("rimraf");
var boilerplates_1 = require("./boilerplates");
var utils_1 = require("./utils");
exports.command = 'create [directory]';
exports.describe = 'Bootstrap a new GraphQL project';
exports.builder = {
    boilerplate: {
        alias: 'b',
        describe: 'Full URL or repo shorthand (e.g. `owner/repo`) to boilerplate GitHub repository',
        type: 'string',
    },
    'no-install': {
        describe: "Don't install project dependencies",
        type: 'boolean',
        default: false,
    },
};
function getGitHubUrl(boilerplate) {
    var details = gh(boilerplate);
    if (details.host && details.owner && details.repo) {
        var branch = details.branch ? "/tree/" + details.branch : '';
        return "https://" + details.host + "/" + details.repo + branch;
    }
}
function handler(context, argv) {
    return __awaiter(this, void 0, void 0, function () {
        var boilerplate, directory, noInstall, newDir, projectPath, allowedFiles_1, conflictingFiles, matchedBoilerplate, maxNameLength_1, choices, choice, zipInfo, downloadUrl, tmpFile, zip, subDirs, installPaths, _i, installPaths_1, packageJsonPath, installPath, installFunction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    boilerplate = argv.boilerplate, directory = argv.directory, noInstall = argv.noInstall;
                    if (directory && directory.match(/[A-Z]/)) {
                        console.log("Project/directory name cannot contain uppercase letters: " + directory);
                        directory = undefined;
                    }
                    if (!!directory) return [3 /*break*/, 2];
                    return [4 /*yield*/, context.prompt({
                            type: 'input',
                            name: 'newDir',
                            default: '.',
                            message: 'Directory for new GraphQL project',
                            validate: function (dir) {
                                if (dir.match(/[A-Z]/)) {
                                    return "Project/directory name cannot contain uppercase letters: " + directory;
                                }
                                return true;
                            },
                        })];
                case 1:
                    newDir = (_a.sent()).newDir;
                    directory = newDir;
                    _a.label = 2;
                case 2:
                    projectPath = path.resolve(directory);
                    if (fs.existsSync(projectPath)) {
                        allowedFiles_1 = ['.git', '.gitignore'];
                        conflictingFiles = fs
                            .readdirSync(projectPath)
                            .filter(function (f) { return !allowedFiles_1.includes(f); });
                        if (conflictingFiles.length > 0) {
                            console.log("Directory " + chalk_1.default.cyan(projectPath) + " must be empty.");
                            return [2 /*return*/];
                        }
                    }
                    else {
                        fs.mkdirSync(projectPath);
                    }
                    // allow short handle boilerplate (e.g. `node-basic`)
                    if (boilerplate && !boilerplate.startsWith('http')) {
                        matchedBoilerplate = boilerplates_1.defaultBoilerplates.find(function (b) { return b.name === boilerplate; });
                        if (matchedBoilerplate) {
                            boilerplate = matchedBoilerplate.repo;
                        }
                        else {
                            // allow shorthand GitHub URLs (e.g. `graphcool/graphcool-server-example`)
                            boilerplate = getGitHubUrl(boilerplate);
                        }
                    }
                    if (!!boilerplate) return [3 /*break*/, 4];
                    maxNameLength_1 = boilerplates_1.defaultBoilerplates
                        .map(function (bp) { return bp.name.length; })
                        .reduce(function (max, x) { return Math.max(max, x); }, 0);
                    choices = boilerplates_1.defaultBoilerplates.map(function (bp) { return lodash_1.padEnd(bp.name, maxNameLength_1 + 2) + " " + bp.description; });
                    return [4 /*yield*/, context.prompt({
                            type: 'list',
                            name: 'choice',
                            message: "Choose GraphQL boilerplate project:",
                            choices: choices,
                        })];
                case 3:
                    choice = (_a.sent()).choice;
                    boilerplate = boilerplates_1.defaultBoilerplates[choices.indexOf(choice)].repo;
                    _a.label = 4;
                case 4:
                    zipInfo = utils_1.getZipInfo(boilerplate);
                    downloadUrl = zipInfo.url;
                    tmpFile = tmp.fileSync();
                    console.log("[graphql create] Downloading boilerplate from " + downloadUrl + "...");
                    return [4 /*yield*/, new Promise(function (resolve) {
                            request(downloadUrl)
                                .pipe(fs.createWriteStream(tmpFile.name))
                                .on('close', resolve);
                        })];
                case 5:
                    _a.sent();
                    zip = new Zip(tmpFile.name);
                    zip.extractEntryTo(zipInfo.path, projectPath, false);
                    tmpFile.removeCallback();
                    if (!!noInstall) return [3 /*break*/, 11];
                    subDirs = fs
                        .readdirSync(projectPath)
                        .map(function (f) { return path.join(projectPath, f); })
                        .filter(function (f) { return fs.statSync(f).isDirectory(); });
                    installPaths = [projectPath].concat(subDirs).map(function (dir) { return path.join(dir, 'package.json'); })
                        .filter(function (p) { return fs.existsSync(p); });
                    _i = 0, installPaths_1 = installPaths;
                    _a.label = 6;
                case 6:
                    if (!(_i < installPaths_1.length)) return [3 /*break*/, 11];
                    packageJsonPath = installPaths_1[_i];
                    process.chdir(path.dirname(packageJsonPath));
                    console.log("[graphql create] Installing node dependencies for " + packageJsonPath + "...");
                    if (!commandExists.sync('yarn')) return [3 /*break*/, 8];
                    return [4 /*yield*/, shell('yarn install')];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, shell('npm install')];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 6];
                case 11:
                    // change dir to projectPath for install steps
                    process.chdir(projectPath);
                    installPath = path.join(projectPath, 'install.js');
                    if (!fs.existsSync(installPath)) {
                        installPath = path.join(projectPath, '.install');
                    }
                    if (!fs.existsSync(installPath)) return [3 /*break*/, 13];
                    console.log("[graphql create] Running boilerplate install script... ");
                    installFunction = require(installPath);
                    return [4 /*yield*/, installFunction({
                            context: context,
                            project: path.basename(projectPath),
                            projectDir: directory,
                        })];
                case 12:
                    _a.sent();
                    rimraf.sync(installPath);
                    _a.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.handler = handler;
function shell(command) {
    return new Promise(function (resolve, reject) {
        var commandParts = command.split(' ');
        var cmd = cross_spawn_1.spawn(commandParts[0], commandParts.slice(1), {
            cwd: process.cwd(),
            detached: false,
            stdio: 'inherit',
        });
        cmd.on('error', reject);
        cmd.on('close', resolve);
    });
}
//# sourceMappingURL=index.js.map