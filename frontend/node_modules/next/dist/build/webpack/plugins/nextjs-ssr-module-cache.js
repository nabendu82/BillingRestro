"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackSources = require("webpack-sources");

var _path = require("path");

var _constants = require("../../../lib/constants");

var SSR_MODULE_CACHE_FILENAME = 'ssr-module-cache.js'; // By default webpack keeps initialized modules per-module.
// This means that if you have 2 entrypoints loaded into the same app
// they will *not* share the same instance
// This creates many issues when developers / libraries rely on the singleton pattern
// As this pattern assumes every module will have 1 instance
// This plugin overrides webpack's code generation step to replace `installedModules`
// The replacement is a require for a file that's also generated here that only exports an empty object
// Because of Node.js's single instance modules this makes webpack share all initialized instances
// Do note that this module is only geared towards the `node` compilation target.
// For the client side compilation we use `runtimeChunk: 'single'`

var NextJsSsrImportPlugin =
/*#__PURE__*/
function () {
  function NextJsSsrImportPlugin(options) {
    (0, _classCallCheck2.default)(this, NextJsSsrImportPlugin);
    this.options = options;
  }

  (0, _createClass2.default)(NextJsSsrImportPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var outputPath = this.options.outputPath;
      compiler.hooks.emit.tapAsync('NextJsSSRModuleCache', function (compilation, callback) {
        compilation.assets[SSR_MODULE_CACHE_FILENAME] = new _webpackSources.RawSource("\n      /* This cache is used by webpack for instantiated modules */\n      module.exports = {}\n      ");
        callback();
      });
      compiler.hooks.compilation.tap('NextJsSSRModuleCache', function (compilation) {
        compilation.mainTemplate.hooks.localVars.intercept({
          register: function register(tapInfo) {
            if (tapInfo.name === 'MainTemplate') {
              var originalFn = tapInfo.fn;

              tapInfo.fn = function (source, chunk) {
                // If the chunk is not part of the pages directory we have to keep the original behavior,
                // otherwise webpack will error out when the file is used before the compilation finishes
                // this is the case with mini-css-extract-plugin
                if (!_constants.IS_BUNDLED_PAGE_REGEX.exec(chunk.name)) {
                  return originalFn(source, chunk);
                }

                var pagePath = (0, _path.join)(outputPath, (0, _path.dirname)(chunk.name));
                var relativePathToBaseDir = (0, _path.relative)(pagePath, (0, _path.join)(outputPath, SSR_MODULE_CACHE_FILENAME)); // Make sure even in windows, the path looks like in unix
                // Node.js require system will convert it accordingly

                var relativePathToBaseDirNormalized = relativePathToBaseDir.replace(/\\/g, '/');
                return _webpack.default.Template.asString([source, '// The module cache', "var installedModules = require('".concat(relativePathToBaseDirNormalized, "');")]);
              };
            }

            return tapInfo;
          }
        });
      });
    }
  }]);
  return NextJsSsrImportPlugin;
}();

exports.default = NextJsSsrImportPlugin;