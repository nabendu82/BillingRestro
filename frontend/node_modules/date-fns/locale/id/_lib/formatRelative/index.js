'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: 'dddd [lalu pukul] LT',
  yesterday: '[Kemarin pukul] LT',
  today: '[Hari ini pukul] LT',
  tomorrow: '[Besok pukul] LT',
  nextWeek: 'dddd [pukul] LT',
  other: 'L'
};

function formatRelative(token, date, baseDate, options) {
  return formatRelativeLocale[token];
}
module.exports = exports['default'];