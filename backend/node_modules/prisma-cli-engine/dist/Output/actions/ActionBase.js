"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var figures = require("figures");
function shouldDisplaySpinner(out) {
    return (!process.env.DEBUG &&
        !out.mock &&
        !out.config.debug &&
        !!process.stdin.isTTY &&
        !!process.stderr.isTTY &&
        !process.env.CI &&
        process.env.TERM !== 'dumb');
}
exports.shouldDisplaySpinner = shouldDisplaySpinner;
var ActionBase = /** @class */ (function () {
    function ActionBase(out) {
        this.out = out;
    }
    ActionBase.prototype.start = function (action, status) {
        this.task = {
            action: action,
            status: status,
            active: true,
        };
        this._start();
        this.task.active = true;
        this.log(this.task);
    };
    ActionBase.prototype.stop = function (msg) {
        if (msg === void 0) { msg = chalk_1.default.green(figures.tick); }
        var task = this.task;
        if (!task) {
            return;
        }
        this.status = msg;
        this._stop();
        task.active = false;
        delete this.task;
    };
    Object.defineProperty(ActionBase.prototype, "status", {
        get: function () {
            return this.task ? this.task.status : undefined;
        },
        set: function (status) {
            var task = this.task;
            if (!task) {
                return;
            }
            if (task.status === status) {
                return;
            }
            this._updateStatus(status || '', task.status);
            task.status = status;
            this.log(task);
        },
        enumerable: true,
        configurable: true
    });
    ActionBase.prototype.pause = function (fn, icon) {
        var task = this.task;
        var active = task && task.active;
        if (task && active) {
            this._pause(icon);
            task.active = false;
        }
        else {
            if (task && !task.active) {
                this.resume();
            }
        }
        var ret = fn ? fn() : null;
        return ret;
    };
    ActionBase.prototype.log = function (_a) {
        var action = _a.action, status = _a.status;
        var msg = status ? action + "... " + status + "\n" : action + "...\n";
        this.out.stderr.writeLogFile(msg, true);
    };
    ActionBase.prototype._start = function () {
        throw new Error('not implemented');
    };
    ActionBase.prototype._stop = function () {
        throw new Error('not implemented');
    };
    ActionBase.prototype.resume = function () {
        if (this.task) {
            this.start(this.task.action, this.task.status);
        }
    };
    ActionBase.prototype._pause = function (icon) {
        throw new Error('not implemented');
    };
    ActionBase.prototype._updateStatus = function (status, prevStatus) {
        // noop
    };
    return ActionBase;
}());
exports.ActionBase = ActionBase;
//# sourceMappingURL=ActionBase.js.map