"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function termWidth(stream) {
    if (!stream.isTTY) {
        return 80;
    }
    var width = stream.getWindowSize()[0];
    if (width < 1) {
        return 80;
    }
    if (width < 40) {
        return 40;
    }
    return width;
}
exports.stdtermwidth = global.columns || termWidth(process.stdout);
exports.errtermwidth = global.columns || termWidth(process.stderr);
//# sourceMappingURL=screen.js.map