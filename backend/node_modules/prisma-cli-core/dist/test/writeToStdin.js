"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function writeToStdIn(commands, timeout) {
    if (timeout === void 0) { timeout = 200; }
    return new Promise(function (resolve) {
        function loop(combo) {
            if (combo.length > 0) {
                setTimeout(function () {
                    process.stdin.write(combo[0]);
                    loop(combo.slice(1));
                }, timeout);
            }
            else {
                // process.stdin.end()
                resolve();
            }
        }
        loop(commands);
    });
}
exports.writeToStdIn = writeToStdIn;
exports.DOWN = '\x1B\x5B\x42';
exports.UP = '\x1B\x5B\x41';
exports.ENTER = '\x0D';
//# sourceMappingURL=writeToStdin.js.map