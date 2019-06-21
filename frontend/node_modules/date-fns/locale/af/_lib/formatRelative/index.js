'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: '[verlede] dddd [om] LT',
  yesterday: '[gister om] LT',
  today: '[vandag om] LT',
  tomorrow: '[môre om] LT',
  nextWeek: 'dddd [om] LT',
  other: 'L'
};

function formatRelative(token, date, baseDate, options) {
  return formatRelativeLocale[token];
}
module.exports = exports['default'];