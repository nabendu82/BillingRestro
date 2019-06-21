"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var utils_1 = require("./utils");
ava_1.default('default', function (t) {
    t.deepEqual(utils_1.getZipInfo('https://github.com/graphcool/boilerplate'), {
        url: 'https://github.com/graphcool/boilerplate/archive/master.zip',
        path: 'boilerplate-master/',
    });
});
ava_1.default('branch', function (t) {
    t.deepEqual(utils_1.getZipInfo('https://github.com/graphcool/boilerplate/tree/dev'), {
        url: 'https://github.com/graphcool/boilerplate/archive/dev.zip',
        path: 'boilerplate-dev/',
    });
});
ava_1.default('branch', function (t) {
    t.deepEqual(utils_1.getZipInfo('https://github.com/graphcool/boilerplate/tree/new-feature-3'), {
        url: 'https://github.com/graphcool/boilerplate/archive/new-feature-3.zip',
        path: 'boilerplate-new-feature-3/',
    });
});
ava_1.default('sub dir', function (t) {
    t.deepEqual(utils_1.getZipInfo('https://github.com/graphcool/boilerplate/tree/dev/src/tests'), {
        url: 'https://github.com/graphcool/boilerplate/archive/dev.zip',
        path: 'boilerplate-dev/src/tests/',
    });
});
//# sourceMappingURL=utils.test.js.map