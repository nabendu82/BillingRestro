"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var React = _interopRequireWildcard(require("react"));

var ErrorBoundary =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    (0, _classCallCheck2.default)(this, ErrorBoundary);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ErrorBoundary).apply(this, arguments));
  }

  (0, _createClass2.default)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError; // onError is required

      onError(error, info);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return React.Children.only(children);
    }
  }]);
  return ErrorBoundary;
}(React.Component);

var _default = ErrorBoundary;
exports.default = _default;