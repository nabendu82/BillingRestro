"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var crypto = require("crypto");
var path = require("path");
var os = require("os");
exports.noEndpointError = new Error("You don't have any endpoint in your .graphqlconfig.\nRun " + chalk_1.default.yellow('graphql add-endpoint') + " to add an endpoint to your config");
function randomString(len) {
    if (len === void 0) { len = 32; }
    return crypto
        .randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')
        .slice(0, len)
        .replace(/\+/g, '0')
        .replace(/\//g, '0');
}
function getTmpPath() {
    return path.join(os.tmpdir(), randomString() + ".json");
}
exports.getTmpPath = getTmpPath;
//# sourceMappingURL=utils.js.map