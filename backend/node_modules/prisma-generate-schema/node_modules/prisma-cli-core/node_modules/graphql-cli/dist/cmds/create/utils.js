"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getZipInfo(boilerplate) {
    var baseUrl = boilerplate;
    var branch = 'master';
    var subDir = '';
    var branchMatches = boilerplate.match(/^(.*)\/tree\/([a-zA-Z-_0-9]*)\/?(.*)$/);
    if (branchMatches) {
        baseUrl = branchMatches[1];
        branch = branchMatches[2];
        subDir = branchMatches[3];
    }
    if (subDir === undefined) {
        subDir = '';
    }
    if (!subDir.startsWith('/')) {
        subDir = '/' + subDir;
    }
    if (!subDir.endsWith('/')) {
        subDir = subDir + '/';
    }
    var nameMatches = baseUrl.match(/github\.com\/(.*)\/(.*)$/);
    var repoName = nameMatches[2];
    var url = baseUrl + "/archive/" + branch + ".zip";
    var path = repoName + "-" + branch + subDir;
    return { url: url, path: path };
}
exports.getZipInfo = getZipInfo;
//# sourceMappingURL=utils.js.map