"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusChecker_1 = require("./StatusChecker");
var _a = JSON.parse(process.argv[2]), request = _a.request, cachePath = _a.cachePath;
StatusChecker_1.doJobs(cachePath, request);
//# sourceMappingURL=check.js.map