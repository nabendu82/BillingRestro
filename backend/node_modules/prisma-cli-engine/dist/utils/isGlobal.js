"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isGlobal = null;
var debug = require('debug')('isGlobal');
function getIsGlobal() {
    if (isGlobal !== null) {
        return isGlobal;
    }
    isGlobal = false;
    if (process.platform === 'win32') {
        if (process.env.Path && process.mainModule) {
            var paths = process.env.Path.split(';');
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var p = paths_1[_i];
                if (p.indexOf('npm') !== -1 &&
                    process.mainModule.filename.indexOf(p) !== -1) {
                    isGlobal = true;
                    break;
                }
            }
        }
    }
    else {
        isGlobal = !process.argv[1].includes('node_modules/.bin');
    }
    return isGlobal;
}
exports.getIsGlobal = getIsGlobal;
//# sourceMappingURL=isGlobal.js.map