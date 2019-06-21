"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var fs = require("fs-extra");
var path = require("path");
var defaultN = 50;
var start = 400;
function makeNodes(n) {
    if (n === void 0) { n = defaultN; }
    var values = [];
    for (var i = 0; i < n; i++) {
        values.push({
            _typeName: 'Post',
            id: String(start + i),
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraphs(),
            state: 'Published',
        });
    }
    for (var i = 0; i < n; i++) {
        values.push({
            _typeName: 'Comment',
            id: String(start + n + i),
            text: faker.lorem.sentence(),
        });
    }
    return {
        valueType: 'nodes',
        values: values,
    };
}
function makeLists(n) {
    if (n === void 0) { n = defaultN; }
    var values = [];
    for (var i = 0; i < n; i++) {
        values.push({
            _typeName: 'Post',
            id: String(start + i),
            tags: ['a', 'b', 'c'],
        });
    }
    return {
        valueType: 'lists',
        values: values,
    };
}
function makeRelations(n) {
    if (n === void 0) { n = defaultN; }
    var values = [];
    for (var i = 0; i < n; i++) {
        values.push([
            {
                _typeName: 'Post',
                id: String(start + i),
                fieldName: 'comments',
            },
            {
                _typeName: 'Comment',
                id: String(start + n + i),
                fieldName: 'post',
            },
        ]);
    }
    return {
        valueType: 'relations',
        values: values,
    };
}
var nodes = makeNodes();
var lists = makeLists();
var relations = makeRelations();
fs.writeFileSync(path.join(__dirname, '.import/nodes/', '000001.json'), JSON.stringify(nodes, null, 2));
fs.writeFileSync(path.join(__dirname, '.import/lists/', '000001.json'), JSON.stringify(lists, null, 2));
fs.writeFileSync(path.join(__dirname, '.import/relations/', '000001.json'), JSON.stringify(relations, null, 2));
//# sourceMappingURL=makeData.js.map