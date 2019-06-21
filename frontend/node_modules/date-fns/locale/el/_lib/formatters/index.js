'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatters = {};

var genetiveMonths = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου'];

// Generate genitive variant of full months
var formatsWithGenitive = ['D', 'Do', 'DD'];
formatsWithGenitive.forEach(function (formatterToken) {
  formatters[formatterToken + ' MMMM'] = function (date, options) {
    var commonFormatters = options.formatters;
    var formatter = commonFormatters[formatterToken];
    return formatter(date, options) + ' ' + genetiveMonths[date.getUTCMonth()];
  };
});

exports.default = formatters;
module.exports = exports['default'];