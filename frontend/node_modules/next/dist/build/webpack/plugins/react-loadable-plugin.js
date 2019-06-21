"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactLoadablePlugin = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _url = _interopRequireDefault(require("url"));

/**
COPYRIGHT (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWAR
*/
// Implementation of this PR: https://github.com/jamiebuilds/react-loadable/pull/132
// Modified to strip out unneeded results for Next's specific use case
function buildManifest(compiler, compilation) {
  var context = compiler.options.context;
  var manifest = {};
  compilation.chunks.forEach(function (chunk) {
    chunk.files.forEach(function (file) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(chunk.modulesIterable), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var module = _step.value;
          var id = module.id;
          var name = typeof module.libIdent === 'function' ? module.libIdent({
            context: context
          }) : null; // If it doesn't end in `.js` Next.js can't handle it right now.

          if (!file.match(/\.js$/) || !file.match(/^static\/chunks\//)) {
            return;
          }

          var publicPath = _url.default.resolve(compilation.outputOptions.publicPath || '', file);

          var currentModule = module;

          if (module.constructor.name === 'ConcatenatedModule') {
            currentModule = module.rootModule;
          }

          if (!manifest[currentModule.rawRequest]) {
            manifest[currentModule.rawRequest] = [];
          }

          manifest[currentModule.rawRequest].push({
            id: id,
            name: name,
            file: file,
            publicPath: publicPath
          });
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
    });
  });
  return manifest;
}

var ReactLoadablePlugin =
/*#__PURE__*/
function () {
  function ReactLoadablePlugin() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, ReactLoadablePlugin);
    this.filename = opts.filename;
  }

  (0, _createClass2.default)(ReactLoadablePlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.emit.tapAsync('ReactLoadableManifest', function (compilation, callback) {
        var manifest = buildManifest(compiler, compilation);
        var json = (0, _stringify.default)(manifest, null, 2);
        compilation.assets[_this.filename] = {
          source: function source() {
            return json;
          },
          size: function size() {
            return json.length;
          }
        };
        callback();
      });
    }
  }]);
  return ReactLoadablePlugin;
}();

exports.ReactLoadablePlugin = ReactLoadablePlugin;