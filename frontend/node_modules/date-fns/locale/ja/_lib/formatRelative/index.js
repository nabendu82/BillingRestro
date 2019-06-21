'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: '[先週の]dddd[の]LT',
  yesterday: '[昨日の]LT',
  today: '[今日の]LT',
  tomorrow: '[明日の]LT',
  nextWeek: '[次の]dddd LT[に]',
  other: 'L'
};

function formatRelative(token, date, baseDate, options) {
  return formatRelativeLocale[token];
}
module.exports = exports['default'];