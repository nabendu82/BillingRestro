"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _webpackSources = require("webpack-sources");

var _constants = require("../../../lib/constants");

var PagesPlugin =
/*#__PURE__*/
function () {
  function PagesPlugin() {
    (0, _classCallCheck2.default)(this, PagesPlugin);
  }

  (0, _createClass2.default)(PagesPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      compiler.hooks.compilation.tap('PagesPlugin', function (compilation) {
        // This hook is triggered right before a module gets wrapped into it's initializing function,
        // For example when you look at the source of a bundle you'll see an object holding `'pages/_app.js': function(module, etc, etc)`
        // This hook triggers right before that code is added and wraps the module into `__NEXT_REGISTER_PAGE` when the module is a page
        // The reason we're doing this is that we don't want to execute the page code which has potential side effects before switching to a route
        compilation.moduleTemplates.javascript.hooks.render.tap('PagesPluginRenderPageRegister', function (moduleSourcePostModule, module, options) {
          var chunk = options.chunk; // check if the current module is the entry module, we only want to wrap the topmost module

          if (chunk.entryModule !== module) {
            return moduleSourcePostModule;
          } // Check if the chunk is a page


          if (!_constants.IS_BUNDLED_PAGE_REGEX.test(chunk.name)) {
            return moduleSourcePostModule;
          } // Match the route the chunk belongs to


          var routeName = _constants.ROUTE_NAME_REGEX.exec(chunk.name)[1]; // We need to convert \ into / when we are in windows
          // to get the proper route name
          // Here we need to do windows check because it's possible
          // to have "\" in the filename in unix.
          // Anyway if someone did that, he'll be having issues here.
          // But that's something we cannot avoid.


          if (/^win/.test(process.platform)) {
            routeName = routeName.replace(/\\/g, '/');
          }

          routeName = "/".concat(routeName.replace(/(^|\/)index$/, ''));
          var source = new _webpackSources.ConcatSource("__NEXT_REGISTER_PAGE('".concat(routeName, "', function() {\n"), moduleSourcePostModule, '\nreturn { page: module.exports.default }', '});');
          return source;
        });
      });
    }
  }]);
  return PagesPlugin;
}();

exports.default = PagesPlugin;