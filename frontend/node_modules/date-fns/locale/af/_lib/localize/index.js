'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildLocalizeFn/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../_lib/buildLocalizeArrayFn/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weekdayValues = {
  narrow: ['So', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Sa'],
  short: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
  long: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag']
};

var monthValues = {
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
  long: ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember']
};

var timeOfDayValues = {
  uppercase: ['VM', 'NM'],
  lowercase: ['vm', 'nm'],
  long: ['vm', 'nm']
};

function ordinalNumber(dirtyNumber) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 < 20) {
    switch (rem100) {
      case 1:
      case 8:
        return number + 'ste';
      default:
        return number + 'de';
    }
  }
  return number + 'ste';
}

var localize = {
  ordinalNumber: ordinalNumber,
  weekday: (0, _index2.default)(weekdayValues, 'long'),
  weekdays: (0, _index4.default)(weekdayValues, 'long'),
  month: (0, _index2.default)(monthValues, 'long'),
  months: (0, _index4.default)(monthValues, 'long'),
  timeOfDay: (0, _index2.default)(timeOfDayValues, 'long', function (hours) {
    return hours / 12 >= 1 ? 1 : 0;
  }),
  timesOfDay: (0, _index4.default)(timeOfDayValues, 'long')
};

exports.default = localize;
module.exports = exports['default'];