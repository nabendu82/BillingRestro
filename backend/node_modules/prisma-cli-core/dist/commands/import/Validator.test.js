"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("./Validator");
describe('Validator', function () {
    describe('valideNode', function () {
        test('throws when _typeName missing', function () {
            var types = "\n      type Post {\n        title: String\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () { return validator.validateNode({}); }).toThrow();
        });
        test('throws for unkown _typeName', function () {
            var types = "\n      type Post {\n        title: String\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () { return validator.validateNode({ _typeName: 'Post2' }); }).toThrow();
        });
        test('ignores non-required field', function () {
            var types = "\n      type Post {\n        id: ID!\n        title: String\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(validator.validateNode({ _typeName: 'Post', id: 'asd' })).toBe(true);
        });
        test('throws non-existing required field', function () {
            var types = "\n      type Post {\n        title: String!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () { return validator.validateNode({ _typeName: 'Post' }); }).toThrow();
        });
        test('accepts non-existing list fields', function () {
            var types = "\n      type Post {\n        id: ID!\n        titles: [String!]!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(validator.validateNode({ _typeName: 'Post', id: 'some-id' }));
        });
        test('ID', function () {
            var types = "\n      type Post {\n        id: ID!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateNode({ _typeName: 'Post', id: 25 });
            }).toThrow();
            expect(validator.validateNode({ _typeName: 'Post', id: '25' })).toBe(true);
        });
        test('String', function () {
            var types = "\n      type Post {\n        id: ID!\n        title: String!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateNode({ _typeName: 'Post', id: '25', title: true });
            }).toThrow();
            expect(validator.validateNode({
                _typeName: 'Post',
                id: '25',
                title: 'Some Title',
            })).toBe(true);
        });
        test('Boolean', function () {
            var types = "\n      type Post {\n        id: ID!\n        bool: Boolean!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateNode({ _typeName: 'Post', id: '25', bool: 0 });
            }).toThrow();
            expect(validator.validateNode({
                _typeName: 'Post',
                id: '25',
                bool: false,
            })).toBe(true);
        });
        test('DateTime', function () {
            var types = "\n      type Post {\n        id: ID!\n        date: DateTime!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateNode({ _typeName: 'Post', id: '25', date: '' });
            }).toThrow();
            expect(validator.validateNode({
                _typeName: 'Post',
                id: '25',
                date: '2017-12-13T14:09:25.012Z',
            })).toBe(true);
        });
        test('Int', function () {
            var types = "\n      type Post {\n        id: ID! int: Int!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateNode({ _typeName: 'Post', id: '25', int: 10.5 });
            }).toThrow();
            expect(validator.validateNode({
                _typeName: 'Post',
                id: '25',
                int: 10,
            })).toBe(true);
        });
        test('Float', function () {
            var types = "\n      type Post {\n        id: ID!\n        float: Float!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateNode({ _typeName: 'Post', id: '25', float: 'hi' });
            }).toThrow();
            expect(validator.validateNode({
                _typeName: 'Post',
                id: '25',
                float: 20.2,
            })).toBe(true);
        });
        test('Enum', function () {
            var types = "\n      type Post {\n        id: ID!\n        enum: Tree\n      }\n\n      enum Tree {\n        Giant_sequoia\n        Coconut\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateNode({ _typeName: 'Post', id: '25', enum: '' });
            }).toThrow();
            expect(validator.validateNode({
                _typeName: 'Post',
                id: '25',
                enum: 'Coconut',
            })).toBe(true);
        });
    });
    describe('validateListNode', function () {
        test('List', function () {
            var types = "\n      type Post {\n        id: ID!\n        tags: [String!]!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateListNode({
                    _typeName: 'Post',
                    id: '25',
                    tags: [1, 2, 3],
                });
            }).toThrow();
            expect(function () {
                return validator.validateListNode({ _typeName: 'Post', id: '25', tags: '' });
            }).toThrow();
            expect(validator.validateListNode({
                _typeName: 'Post',
                id: '25',
                tags: ['a', 'b', 'c'],
            })).toBe(true);
        });
    });
    describe('validateRelationTuple', function () {
        test('relations', function () {
            var types = "\n      type Post {\n        id: ID!\n        self: Post! @relation(name: \"Some Name\")\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateRelationTuple([
                    {
                        _typeName: 'Post',
                        fieldName: 'self2',
                        id: '23',
                    },
                    {
                        _typeName: 'Post',
                        fieldName: 'self',
                        id: '25',
                    },
                ]);
            }).toThrow();
            expect(function () {
                return validator.validateRelationTuple([
                    {
                        _typeName: 'Post',
                        fieldName: 'self2',
                        id: '23',
                    },
                ]);
            }).toThrow();
            expect(function () {
                return validator.validateRelationTuple([
                    {
                        _typeName: 'Post2',
                        fieldName: 'self',
                        id: '23',
                    },
                    {
                        _typeName: 'Post',
                        fieldName: 'self',
                        id: '25',
                    },
                ]);
            }).toThrow();
            expect(function () {
                return validator.validateRelationTuple([
                    {
                        _typeName: 'Post2',
                        fieldName: 'self',
                    },
                    {
                        _typeName: 'Post',
                        fieldName: 'self',
                        id: '25',
                    },
                ]);
            }).toThrow();
            expect(validator.validateRelationTuple([
                {
                    _typeName: 'Post',
                    fieldName: 'self',
                    id: '23',
                },
                {
                    _typeName: 'Post',
                    fieldName: 'self',
                    id: '25',
                },
            ])).toBe(true);
        });
    });
    describe('validateImportData', function () {
        test('nodes', function () {
            var types = "\n      type Post {\n        id: ID!\n        string: String!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateImportData({
                    valueType: 'nodes',
                    values: [
                        {
                            _typeName: 'Post',
                            id: 'a',
                            string: '',
                        },
                        {
                            _typeName: 'Post',
                            id: 'b',
                        },
                    ],
                });
            }).toThrow();
            expect(validator.validateImportData({
                valueType: 'nodes',
                values: [
                    {
                        _typeName: 'Post',
                        id: 'a',
                        string: '',
                    },
                    {
                        _typeName: 'Post',
                        id: 'b',
                        string: '',
                    },
                    {
                        _typeName: 'Post',
                        id: 'c',
                        string: '',
                    },
                    {
                        _typeName: 'Post',
                        id: 'd',
                        string: '',
                    },
                    {
                        _typeName: 'Post',
                        id: 'e',
                        string: '',
                    },
                ],
            })).toBe(true);
        });
        test('relations', function () {
            var types = "\n      type Post {\n        id: ID!\n        self: Post! @relation(name: \"RelationName\")\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateImportData({
                    valueType: 'relations',
                    values: [
                        [
                            {
                                _typeName: 'Post',
                                id: 'a',
                                fieldName: 'self',
                            },
                            {
                                _typeName: 'Post',
                                id: 'b',
                                fieldName: 'self2',
                            },
                        ],
                    ],
                });
            }).toThrow();
            expect(validator.validateImportData({
                valueType: 'relations',
                values: [
                    [
                        {
                            _typeName: 'Post',
                            id: 'a',
                            fieldName: 'self',
                        },
                        {
                            _typeName: 'Post',
                            id: 'b',
                            fieldName: 'self',
                        },
                    ],
                ],
            })).toBe(true);
        });
        test('lists', function () {
            var types = "\n      type Post {\n        id: ID!\n        nonScalarButRequired: Int!\n        listValue: [String!]!\n      }\n    ";
            var validator = new Validator_1.Validator(types);
            expect(function () {
                return validator.validateImportData({
                    valueType: 'lists',
                    values: [
                        {
                            _typeName: 'Post',
                            id: 'a',
                            nonScalarButRequired: 5,
                            listValue: ['a', 'b', 'c'],
                        },
                        {
                            _typeName: 'Post',
                            id: 'b',
                            nonScalarButRequired: 5,
                            listValue: ['a', 'b', 'c'],
                        },
                    ],
                });
            }).toThrow();
            expect(validator.validateImportData({
                valueType: 'lists',
                values: [
                    {
                        _typeName: 'Post',
                        id: 'a',
                        listValue: ['a', 'b', 'c'],
                    },
                    {
                        _typeName: 'Post',
                        id: 'b',
                        listValue: ['a', 'b', 'c'],
                    },
                ],
            })).toBe(true);
        });
    });
});
//# sourceMappingURL=Validator.test.js.map