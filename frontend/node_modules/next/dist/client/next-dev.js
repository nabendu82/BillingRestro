"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var next = _interopRequireWildcard(require("./"));

var _onDemandEntriesClient = _interopRequireDefault(require("./on-demand-entries-client"));

var _webpackHotMiddlewareClient = _interopRequireDefault(require("./webpack-hot-middleware-client"));

// Temporary workaround for the issue described here:
// https://github.com/zeit/next.js/issues/3775#issuecomment-407438123
// The runtimeChunk doesn't have dynamic import handling code when there hasn't been a dynamic import
// The runtimeChunk can't hot reload itself currently to correct it when adding pages using on-demand-entries
import('./noop');
var _window = window,
    assetPrefix = _window.__NEXT_DATA__.assetPrefix;
var prefix = assetPrefix || '';
var webpackHMR = (0, _webpackHotMiddlewareClient.default)({
  assetPrefix: prefix
});
window.next = next;
(0, next.default)({
  webpackHMR: webpackHMR
}).then(function (emitter) {
  (0, _onDemandEntriesClient.default)({
    assetPrefix: prefix
  });
  var lastScroll;
  emitter.on('before-reactdom-render', function (_ref) {
    var Component = _ref.Component,
        ErrorComponent = _ref.ErrorComponent;

    // Remember scroll when ErrorComponent is being rendered to later restore it
    if (!lastScroll && Component === ErrorComponent) {
      var _window2 = window,
          pageXOffset = _window2.pageXOffset,
          pageYOffset = _window2.pageYOffset;
      lastScroll = {
        x: pageXOffset,
        y: pageYOffset
      };
    }
  });
  emitter.on('after-reactdom-render', function (_ref2) {
    var Component = _ref2.Component,
        ErrorComponent = _ref2.ErrorComponent;

    if (lastScroll && Component !== ErrorComponent) {
      // Restore scroll after ErrorComponent was replaced with a page component by HMR
      var _lastScroll = lastScroll,
          x = _lastScroll.x,
          y = _lastScroll.y;
      window.scroll(x, y);
      lastScroll = null;
    }
  });
}).catch(function (err) {
  console.error('Error was not caught', err);
});