"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crossSpawn = require("cross-spawn");
function spawn(cmd, args, options) {
    return new Promise(function (resolve, reject) {
        var buffer = '';
        var cp = crossSpawn(cmd, args, options);
        cp.stdout.on('data', function (data) {
            buffer += data.toString();
        });
        cp.stderr.on('data', function (data) {
            buffer += data.toString();
        });
        cp.on('error', function (err) {
            if (buffer.length > 0) {
                reject(buffer);
            }
            else {
                reject(err);
            }
        });
        cp.on('close', function (code) {
            if (code === 0) {
                resolve(buffer);
            }
            else {
                reject(buffer);
            }
        });
    });
}
exports.spawn = spawn;
//# sourceMappingURL=spawn.js.map