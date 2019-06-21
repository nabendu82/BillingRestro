"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stripAnsi = require("strip-ansi");
/**
 * Generates a Unicode table and feeds it into configured printer.
 *
 * Top-level arguments:
 *
 * @arg {Object[]} data - the records to format as a table.
 * @arg {Object} options - configuration for the table.
 *
 * @arg {Object[]} [options.columns] - Options for formatting and finding values for table columns.
 * @arg {function(string)} [options.headerAnsi] - Zero-width formattter for entire header.
 * @arg {string} [options.colSep] - Separator between columns.
 * @arg {function(row, options)} [options.after] - Function called after each row is printed.
 * @arg {function(string)} [options.printLine] - Function responsible for printing to terminal.
 * @arg {function(cells)} [options.printHeader] - Function to print header cells as a row.
 * @arg {function(cells)} [options.printRow] - Function to print cells as a row.
 *
 * @arg {function(row)|string} [options.columns[].key] - Path to the value in the row or function to retrieve the pre-formatted value for the cell.
 * @arg {function(string)} [options.columns[].label] - Header name for column.
 * @arg {function(string, row)} [options.columns[].format] - Formatter function for column value.
 * @arg {function(row)} [options.columns[].get] - Function to return a value to be presented in cell without formatting.
 *
 */
function table(out, data, options) {
    if (options === void 0) { options = {}; }
    var ary = require('lodash.ary');
    var defaults = require('lodash.defaults');
    var get = require('lodash.get');
    var identity = require('lodash.identity');
    var partial = require('lodash.partial');
    var property = require('lodash.property');
    var result = require('lodash.result');
    var defaultOptions = {
        colSep: '  ',
        after: function () {
            // noop
        },
        headerAnsi: identity,
        printLine: function (s) { return out.log(s); },
        printRow: function (cells) {
            this.printLine(cells.join(this.colSep).trimRight());
        },
        printHeader: function (cells) {
            this.printRow(cells.map(ary(this.headerAnsi, 1)));
            this.printRow(cells.map(function (hdr) { return hdr.replace(/./g, '─'); }));
        },
    };
    var colDefaults = {
        format: function (value) { return (value ? value.toString() : ''); },
        width: 0,
        label: function () {
            return this.key.toString();
        },
        get: function (row) {
            var path = result(this, 'key');
            var value = !path ? row : get(row, path);
            return this.format(value, row);
        },
    };
    function calcWidth(cell) {
        var lines = stripAnsi(cell).split(/[\r\n]+/);
        var lineLengths = lines.map(property('length'));
        return Math.max.apply(Math, lineLengths);
    }
    function pad(str, length) {
        var visibleLength = stripAnsi(str).length;
        var diff = length - visibleLength;
        return str + ' '.repeat(Math.max(0, diff));
    }
    function render() {
        var columns = options.columns || Object.keys(data[0] || {});
        if (typeof columns[0] === 'string') {
            columns = columns.map(function (key) { return ({ key: key }); });
        }
        var defaultsApplied = false;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var row = data_1[_i];
            row.height = 1;
            for (var _a = 0, columns_1 = columns; _a < columns_1.length; _a++) {
                var col = columns_1[_a];
                if (!defaultsApplied) {
                    defaults(col, colDefaults);
                }
                var cell = col.get(row);
                col.width = Math.max(result(col, 'label').length, col.width || 0, calcWidth(cell));
                row.height = Math.max(row.height || 0, cell.split(/[\r\n]+/).length);
            }
            defaultsApplied = true;
        }
        if (options.printHeader) {
            options.printHeader(columns.map(function (col) {
                var label = result(col, 'label');
                return pad(label, col.width || label.length);
            }));
        }
        function getNthLineOfCell(n, row, col) {
            // TODO memoize this
            var lines = col.get(row).split(/[\r\n]+/);
            return pad(lines[n] || '', col.width);
        }
        for (var _b = 0, data_2 = data; _b < data_2.length; _b++) {
            var row = data_2[_b];
            for (var i = 0; i < (row.height || 0); i++) {
                var cells = columns.map(partial(getNthLineOfCell, i, row));
                options.printRow(cells);
            }
            options.after(row, options);
        }
    }
    defaults(options, defaultOptions);
    render();
}
module.exports = table;
//# sourceMappingURL=table.js.map