/*global describe, it */
require('../index.js');

var assert = require('assert');
var fs = require('fs');

describe("simple-errors", function () {
    "use strict";

    it("should add create factory to Error class", function () {
        assert.ok(Error.create);
    });

    it("should add http factory to Error class", function () {
        assert.ok(Error.http);
    });

    it("should add toJson helper method", function () {
        assert.ok(Error.toJson);
    });

    describe("create", function () {

        it("should return an Error instance", function () {

            var err = Error.create('foo');

            assert.ok(err instanceof Error);
            assert.equal('foo', err.message);
        });

        it("should use 'Unknown error' by default", function () {

            var err = Error.create();

            assert.equal('Unknown error', err.message);
        });

        it("should accept a string as data", function () {

            var err = Error.create('foo', 'bar');

            assert.equal('bar', err.data);
        });

        it("should accept another Error as inner", function () {

            var err = Error.create('foo', new Error('bar'));

            assert.equal(undefined, err.data);
            assert.ok(err.inner instanceof Error);
        });

        it("should add properties defined in data", function () {

            var err = Error.create('foo', {status: 200});

            assert.equal(200, err.status);
        });

        it("should accept an inner error in string format", function () {

            var err = Error.create('foo', {}, 'boo');

            assert.equal('boo', err.inner);
        });

        it('should have a valid description message', function () {
            fs.readFile('thisisnotarealfile.txt', function (err, data) {
                assert.ok(err);
                var se = Error.create('foo', err);
                assert.equal('Error: no such file or directory [thisisnotarealfile.txt]',
                    se.description);
            });
        });
    });

    describe("http", function () {

        it("should use 500 as default", function () {

            var err = Error.http();

            assert.equal('Internal Server Error', err.message);
            assert.equal(500, err.status);
        });

        it("should use 500 as default", function () {

            var err = Error.http('foo');

            assert.equal('foo', err.message);
            assert.equal(500, err.status);
        });

        it("should add a default description", function () {

            var err = Error.http(400);

            assert.equal('Bad Request', err.message);
            assert.equal(400, err.status);
        });

        it("should add string data to error", function () {

            var err = Error.http(400, "foo", "bar");

            assert.equal('foo', err.message);
            assert.equal('bar', err.data);
            assert.equal(400, err.status);
        });

        it("should add object data to error", function () {

            var err = Error.http(400, "foo", {x: "bar"});

            assert.equal('foo', err.message);
            assert.equal('bar', err.x);
            assert.equal(400, err.status);
        });

        it("should add inner error", function () {

            var err = Error.http(400, "foo", {}, "something wrong");

            assert.equal('foo', err.message);
            assert.equal('something wrong', err.inner);
            assert.equal(400, err.status);
        });
    });

    describe("toJson", function () {

        it("should return an object with all the properties", function () {
            var err = Error.create('foo', { foo: 'bar' }, 'boo'),
                obj = Error.toJson(err);

            assert.ok(!(obj instanceof Error));
            assert.equal('foo', obj.message);
            assert.equal('bar', obj.foo);
            assert.equal('boo', obj.inner);
        });

        it("should have stack in the keys collection", function () {
            var err = Error.create('foo', { foo: 'bar' }, 'boo'),
                obj = Error.toJson(err);

            assert.ok(Object.keys(obj).indexOf('stack') >= 0);
        });

        it("should recursively turn errors into literals", function () {
            var err = Error.create('foo', {}, Error.create('bar')),
                obj = Error.toJson(err);

            assert.equal('bar', obj.inner.message);
        });

        it("should support a 'string' in inner", function () {
            var err = Error.create('foo', {}, "something bad happened");

            assert.equal("something bad happened", Error.toJson(err).inner);
        });

        it("should return non Error objects", function () {
            var err = Error.toJson({foo: 'bar'});

            assert.deepEqual({foo: 'bar'}, err);
        });
    });

    describe("Inner errors", function () {
        it("should set inner status code to new error", function () {
            var innerError = Error.http(401, "You don't have access to the resource"),
                error = Error.create("The username doesn't have access.", innerError);

            assert.strictEqual(innerError.status, 401);
            assert.strictEqual(error.status, 401);
        });

        it("should show public message only", function () {
            var publicMessage = "My public Error message",
                innerError = new Error("Test Inner error"),
                error = Error.http(403, publicMessage, innerError);

            assert.ok(error);
            assert.equal(publicMessage, Error.publicMessage(error));
        });

        it("should show public message only without inner", function () {
            var publicMessage = "My public Error message",
                error = Error.http(302, publicMessage);

            assert.ok(error);
            assert.equal(publicMessage, Error.publicMessage(error));
        });

        it("should not show any message", function () {
            var publicMessage = "My public Error message",
                error = Error.create(publicMessage, {public: false});

            assert.ok(error);
            assert.equal("", Error.publicMessage(error));
        });

        it("should show every public error message", function () {
            var publicMessage1 = "The table name is incorrect",
                publicMessage2 = "The User can't be created. Please try again with a different name",
                internalInnerError = new Error("Error in DB query. Table 'test' does not exists"),
                dbError = new Error(internalInnerError),
                publicError1 = Error.http(400, publicMessage1, dbError),
                publicError2 = Error.http(400, publicMessage2, null, publicError1);

            assert.ok(publicError2);
            assert.equal(publicMessage2 + " - " + publicMessage1, Error.publicMessage(publicError2));
        });

        it("should not show a private message", function () {
            var publicMessage1 = "The table 'users' is invalid",
                publicMessage2 = "The User can't be created. Please try again with a different name",
                internalInnerError = new Error("Error in DB query. Table 'test' does not exists"),
                dbError = new Error(internalInnerError),
                publicError1 = Error.create(publicMessage1, dbError),
                publicError2 = Error.http(400, publicMessage2, publicError1);

            assert.ok(publicError2);
            assert.equal(publicMessage2, Error.publicMessage(publicError2));
        });
    });
});