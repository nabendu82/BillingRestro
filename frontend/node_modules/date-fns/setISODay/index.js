'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setISODay;

var _index = require('../_lib/toInteger/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../toDate/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../addDays/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../getISODay/index.js');

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setISODay
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday etc.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} day - the day of the ISO week of the new date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the day of the ISO week setted
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * var result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay(dirtyDate, dirtyDay, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index4.default)(dirtyDate, dirtyOptions);
  var day = (0, _index2.default)(dirtyDay);
  var currentDay = (0, _index8.default)(date, dirtyOptions);
  var diff = day - currentDay;
  return (0, _index6.default)(date, diff, dirtyOptions);
}
module.exports = exports['default'];