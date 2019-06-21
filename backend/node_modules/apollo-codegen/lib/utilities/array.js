"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(Array.prototype, 'flatMap', {
    value: function (callbackfn, thisArg) {
        return [].concat.apply([], this.map(callbackfn, thisArg));
    },
    enumerable: false
});
//# sourceMappingURL=array.js.map