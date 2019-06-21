'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildMatchFn/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../_lib/buildParseFn/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../../../_lib/buildMatchPatternFn/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../../../_lib/parseDecimal/index.js');

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchOrdinalNumbersPattern = /^(\d+)(ste|de)?/i;

var matchWeekdaysPatterns = {
  narrow: /^(so|ma|di|wo|do|vr|sa)/i,
  short: /^(son|maa|din|woe|don|vry|sat)/i,
  long: /^(sondag|maandag|dinsdag|woensdag|donderdag|vrydag|saterdag)/i
};

var parseWeekdayPatterns = {
  any: [/^so/i, /^m/i, /^di/i, /^w/i, /^do/i, /^v/i, /^sa/i]
};

var matchMonthsPatterns = {
  short: /^(jan|feb|mar|apr|mei|jun|jul|aug|sep|okt|nov|des)/i,
  long: /^(januarie|februarie|maart|april|mei|junie|julie|augustus|september|oktober|november|desember)/i
};

var parseMonthPatterns = {
  any: [/^ja/i, /^f/i, /^ma/i, /^ap/i, /^me/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};

var matchTimesOfDayPatterns = {
  short: /^(vm|nm)/i,
  long: /^(vm|nm)/i
};

var parseTimeOfDayPatterns = {
  any: [/^v/i, /^n/i]
};

var match = {
  ordinalNumbers: (0, _index6.default)(matchOrdinalNumbersPattern),
  ordinalNumber: _index8.default,
  weekdays: (0, _index2.default)(matchWeekdaysPatterns, 'long'),
  weekday: (0, _index4.default)(parseWeekdayPatterns, 'any'),
  months: (0, _index2.default)(matchMonthsPatterns, 'long'),
  month: (0, _index4.default)(parseMonthPatterns, 'any'),
  timesOfDay: (0, _index2.default)(matchTimesOfDayPatterns, 'long'),
  timeOfDay: (0, _index4.default)(parseTimeOfDayPatterns, 'any')
};

exports.default = match;
module.exports = exports['default'];