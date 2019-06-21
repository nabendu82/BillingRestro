/**
 * simple-errors module
 *
 * Create errors with simple factory methods for easy error handling.
 * License: BSD
 */

/**
 * Use Error.create(msg [, data [, inner]]) to create Error instances.
 * function create
 * @param msg (string)
 * @param data (any type) adds metadata to the Error instance
 * @param inner (any type) for chaining errors
 * @api public
 */

var errno = require('errno');

Error.create = function (msg, data, inner) {
    "use strict";
    var err,
        innerValue;
    data = data || {};

    err = new Error(msg || "Unknown error");

    innerValue = inner || (data instanceof Error ? data : null);
    if (innerValue) {
        err.inner = innerValue;
    }

    if (data instanceof Array || typeof data !== 'object') {
        err.data = data;
    } else {
        Object.keys(data).forEach(function (key) {
            err[key] = data[key];
        });
    }

    if (!err.status) {
        err.status =  (err.inner && err.inner.status) ? err.inner.status : 500;
    }

    err.description = innerValue ? errmsg(innerValue) : '';

    return err;
};

/**
 * Use Error.http([code] [, msg [, data [, inner]]]) to create Error instances with status codes.
 * @param code (numeric) adds status property to the error.
 * @param msg (string)
 * @param data (any type) adds metadata to the Error instance
 * @param inner (Error|string) for chaining errors
 */
Error.http = function (code, msg, data, inner) {
    "use strict";
    if (typeof(code)==='string') {
        inner = data;
        data = msg;
        msg = code;
        code = 500;
    }

    code = code || 500;
    msg = msg || statusCodes["" + code] || 'Unknown error';
    
    var err = Error.create(msg, data, inner);
    err.status = code;
    return err;
};

/**
 * Turn an Error instance into a json object recursively. Use this function
 * for printing the entire error (even the stacks).
 * @param err (Error|Object)
 * @api public
 */
Error.toJson = function ( err ) {
    "use strict";
    if (typeof(err)==='string') return { message: err};

	var info = {};
	if (err instanceof Error) {
		info.message = err.message;
		info.stack = err.stack && err.stack.split("\n");
    }

    if (typeof(err) === 'object') {
        for (var prop in err) {
            var value = err[prop];
            info[prop] = (value instanceof Error) ? Error.toJson(value) : value;
        }
    }
    
    return info;
};

/**
 * Get the public error message recursively through every inner errors
 * A public error is every error instance with a property 'public' set to true
 * @param err (Error|Object)
 * @api public
 */
Error.publicMessage = function (err) {
    "use strict";
    var msg = "",
        statusCode = err.status;

    if (statusCode && Number(statusCode) < 500) {
        msg += err.message;
    }

    if (err.inner) {
        var innerMessage = Error.publicMessage(err.inner);
        msg += innerMessage !== "" ? " - " + innerMessage : "";
    }
    return msg;
};

var statusCodes = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "402": "Payment Required",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "407": "Proxy Authentication Required",
    "408": "Request Timeout",
    "409": "Conflict",
    "410": "Gone",
    "411": "Length Required",
    "412": "Precondition Failed",
    "413": "Request Entity Too Large",
    "414": "Request-URI Too Long",
    "415": "Unsupported Media Type",
    "416": "Requested Range Not Satisfiable",
    "417": "Expectation Failed",
    "418": "I'm a teapot",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "424": "Failed Dependency",
    "425": "Unordered Collection",
    "426": "Upgrade Required",
    "428": "Precondition Required",
    "429": "Too Many Requests",
    "431": "Request Header Fields Too Large",
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
    "505": "HTTP Version Not Supported",
    "506": "Variant Also Negotiates",
    "507": "Insufficient Storage",
    "508": "Loop Detected",
    "510": "Not Extended",
    "511": "Network Authentication Required"
};



function errmsg(err) {
    var str = 'Error: ';
    if (errno.errno[err.errno]) {
        str += errno.errno[err.errno].description;
    } else {
        str += err.message;
    }

    if (err.path) {
        str += ' [' + err.path + ']';
    }
    return str;
}