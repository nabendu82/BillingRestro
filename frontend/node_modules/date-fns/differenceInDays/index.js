'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInDays;

var _index = require('../toDate/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../differenceInCalendarDays/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../compareAsc/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Number} the number of full days
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 * // How many days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * var result = differenceInDays(
 *   new Date(2011, 6, 2, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
*/
function differenceInDays(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var dateLeft = (0, _index2.default)(dirtyDateLeft, dirtyOptions);
  var dateRight = (0, _index2.default)(dirtyDateRight, dirtyOptions);

  var sign = (0, _index6.default)(dateLeft, dateRight, dirtyOptions);
  var difference = Math.abs((0, _index4.default)(dateLeft, dateRight, dirtyOptions));

  dateLeft.setDate(dateLeft.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastDayNotFull = (0, _index6.default)(dateLeft, dateRight, dirtyOptions) === -sign;
  var result = sign * (difference - isLastDayNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}
module.exports = exports['default'];