"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var path = require("path");
var fs = require("fs-extra");
var stripAnsi = require("strip-ansi");
function logToFile(msg, logfile) {
    try {
        fs.mkdirpSync(path.dirname(logfile));
        fs.appendFileSync(logfile, stripAnsi(msg));
    }
    catch (err) {
        console.error(err);
    }
}
exports.logToFile = logToFile;
var StreamOutput = /** @class */ (function () {
    function StreamOutput(stream, output) {
        this.output = '';
        this.out = output;
        this.stream = stream;
    }
    StreamOutput.prototype.write = function (msg, options) {
        if (options === void 0) { options = {}; }
        var startOfLine = this.constructor.startOfLine;
        var log = options.log !== false;
        if (log) {
            this.writeLogFile(msg, startOfLine);
        }
        // conditionally show timestamp if configured to display
        if (startOfLine && this.displayTimestamps) {
            msg = this.timestamp(msg);
        }
        if (this.out.mock) {
            this.output += msg;
        }
        else {
            this.stream.write(msg);
        }
        startOfLine = msg.endsWith('\n');
    };
    StreamOutput.prototype.timestamp = function (msg) {
        return "[" + new Date().toISOString() + "] " + msg;
    };
    StreamOutput.prototype.log = function (data) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var msg = data ? util.format.apply(util, [data].concat(args)) : '';
        msg += '\n';
        this.out.action.pause(function () { return _this.write(msg); });
    };
    StreamOutput.prototype.writeLogFile = function (msg, withTimestamp) {
        if (!this.logfile) {
            return;
        }
        msg = withTimestamp ? this.timestamp(msg) : msg;
        logToFile(msg, this.logfile);
    };
    Object.defineProperty(StreamOutput.prototype, "displayTimestamps", {
        get: function () {
            var bin = this.out.config.bin.replace('-', '_').toUpperCase();
            var key = bin + "_TIMESTAMPS";
            return ['1', 'true'].includes(process.env[key] || '');
        },
        enumerable: true,
        configurable: true
    });
    StreamOutput.startOfLine = true;
    return StreamOutput;
}());
exports.default = StreamOutput;
//# sourceMappingURL=StreamOutput.js.map