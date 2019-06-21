'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: '[eelmine] dddd [kell] LT',
  yesterday: '[eile kell] LT',
  today: '[täna kell] LT',
  tomorrow: '[homme kell] LT',
  nextWeek: 'dddd [kell] LT',
  other: 'L'
};

function formatRelative(token, date, baseDate, options) {
  return formatRelativeLocale[token];
}
module.exports = exports['default'];