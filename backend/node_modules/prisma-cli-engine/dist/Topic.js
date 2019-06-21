"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Topic = /** @class */ (function () {
    function Topic(commands, out) {
        this.out = out;
        this.commands = commands;
    }
    Object.defineProperty(Topic, "id", {
        get: function () {
            return this.topic;
        },
        enumerable: true,
        configurable: true
    });
    Topic.hidden = false;
    return Topic;
}());
exports.Topic = Topic;
//# sourceMappingURL=Topic.js.map