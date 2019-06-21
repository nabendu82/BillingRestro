"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _webpackSources = require("webpack-sources");

var _constants = require("../../../lib/constants");

// This plugin creates a build-manifest.json for all assets that are being output
// It has a mapping of "entry" filename to real filename. Because the real filename can be hashed in production
var BuildManifestPlugin =
/*#__PURE__*/
function () {
  function BuildManifestPlugin() {
    (0, _classCallCheck2.default)(this, BuildManifestPlugin);
  }

  (0, _createClass2.default)(BuildManifestPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      compiler.hooks.emit.tapAsync('NextJsBuildManifest', function (compilation, callback) {
        var chunks = compilation.chunks;
        var assetMap = {
          devFiles: [],
          pages: {}
        };
        var mainJsChunk = chunks.find(function (c) {
          return c.name === _constants.CLIENT_STATIC_FILES_RUNTIME_MAIN;
        });
        var mainJsFiles = mainJsChunk && mainJsChunk.files.length > 0 ? mainJsChunk.files.filter(function (file) {
          return /\.js$/.test(file);
        }) : [];

        var _arr = (0, _keys.default)(compilation.assets);

        for (var _i = 0; _i < _arr.length; _i++) {
          var filePath = _arr[_i];
          var path = filePath.replace(/\\/g, '/');

          if (/^static\/development\/dll\//.test(path)) {
            assetMap.devFiles.push(path);
          }
        } // compilation.entrypoints is a Map object, so iterating over it 0 is the key and 1 is the value


        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator2.default)(compilation.entrypoints.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
                entrypoint = _step$value[1];

            var result = _constants.ROUTE_NAME_REGEX.exec(entrypoint.name);

            if (!result) {
              continue;
            }

            var pagePath = result[1];

            if (!pagePath) {
              continue;
            }

            var filesForEntry = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = (0, _getIterator2.default)(entrypoint.chunks), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var chunk = _step2.value;

                // If there's no name or no files
                if (!chunk.name || !chunk.files) {
                  continue;
                }

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = (0, _getIterator2.default)(chunk.files), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var file = _step3.value;

                    if (/\.map$/.test(file) || /\.hot-update\.js$/.test(file)) {
                      continue;
                    } // Only `.js` and `.css` files are added for now. In the future we can also handle other file types.


                    if (!/\.js$/.test(file) && !/\.css$/.test(file)) {
                      continue;
                    } // The page bundles are manually added to _document.js as they need extra properties


                    if (_constants.IS_BUNDLED_PAGE_REGEX.exec(file)) {
                      continue;
                    }

                    filesForEntry.push(file.replace(/\\/g, '/'));
                  }
                } catch (err) {
                  _didIteratorError3 = true;
                  _iteratorError3 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                      _iterator3.return();
                    }
                  } finally {
                    if (_didIteratorError3) {
                      throw _iteratorError3;
                    }
                  }
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            assetMap.pages["/".concat(pagePath.replace(/\\/g, '/'))] = filesForEntry.concat((0, _toConsumableArray2.default)(mainJsFiles));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (typeof assetMap.pages['/index'] !== 'undefined') {
          assetMap.pages['/'] = assetMap.pages['/index'];
        }

        compilation.assets[_constants.BUILD_MANIFEST] = new _webpackSources.RawSource((0, _stringify.default)(assetMap, null, 2));
        callback();
      });
    }
  }]);
  return BuildManifestPlugin;
}();

exports.default = BuildManifestPlugin;