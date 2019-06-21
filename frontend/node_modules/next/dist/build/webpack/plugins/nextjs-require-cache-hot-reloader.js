"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

function deleteCache(path) {
  delete require.cache[path];
} // This plugin flushes require.cache after emitting the files. Providing 'hot reloading' of server files.


var ChunkNamesPlugin =
/*#__PURE__*/
function () {
  function ChunkNamesPlugin() {
    (0, _classCallCheck2.default)(this, ChunkNamesPlugin);
    (0, _defineProperty2.default)(this, "prevAssets", void 0);
    this.prevAssets = null;
  }

  (0, _createClass2.default)(ChunkNamesPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.afterEmit.tapAsync('NextJsRequireCacheHotReloader', function (compilation, callback) {
        var assets = compilation.assets;

        if (_this.prevAssets) {
          var _arr = (0, _keys.default)(assets);

          for (var _i = 0; _i < _arr.length; _i++) {
            var f = _arr[_i];
            deleteCache(assets[f].existsAt);
          }

          var _arr2 = (0, _keys.default)(_this.prevAssets);

          for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
            var _f = _arr2[_i2];

            if (!assets[_f]) {
              deleteCache(_this.prevAssets[_f].existsAt);
            }
          }
        }

        _this.prevAssets = assets;
        callback();
      });
    }
  }]);
  return ChunkNamesPlugin;
}();

exports.default = ChunkNamesPlugin;