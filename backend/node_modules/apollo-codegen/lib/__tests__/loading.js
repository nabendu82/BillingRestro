"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_tags_1 = require("common-tags");
const fs = require("fs");
const path = require("path");
const loading_1 = require("../loading");
describe('extractDocumentFromJavascript', () => {
    test('normal queries', () => {
        const contents = fs.readFileSync(path.join(__dirname, '__fixtures__', 'normal.js')).toString();
        expect(common_tags_1.stripIndents `${loading_1.extractDocumentFromJavascript(contents)}`)
            .toMatch(common_tags_1.stripIndents `
          query UserProfileView {
            me {
              id
              uuid
              role
            }
          }
        `);
    });
    test('comments in template string', () => {
        const contents = fs.readFileSync(path.join(__dirname, '__fixtures__', 'comments.js')).toString();
        expect(common_tags_1.stripIndents `${loading_1.extractDocumentFromJavascript(contents)}`)
            .toMatch(common_tags_1.stripIndents `
          query UserProfileView {
            me {
              id
              # TODO: https://www.fast.com/sdf/sdf
              uuid
              # Some other comment
              role
            }
          }
        `);
    });
    test('gql completely commented out', () => {
        const contents = fs.readFileSync(path.join(__dirname, '__fixtures__', 'commentedOut.js')).toString();
        expect(loading_1.extractDocumentFromJavascript(contents))
            .toBeNull();
    });
    test('invalid gql', () => {
        const contents = fs.readFileSync(path.join(__dirname, '__fixtures__', 'invalid.js')).toString();
        expect(loading_1.extractDocumentFromJavascript(contents))
            .toBeNull();
    });
});
describe('Validation', () => {
    test(`should extract gql snippet from javascript file`, () => {
        const inputPaths = [
            path.join(__dirname, '../../test/fixtures/starwars/gqlQueries.js'),
        ];
        const document = loading_1.loadAndMergeQueryDocuments(inputPaths);
        expect(document).toMatchSnapshot();
    });
});
//# sourceMappingURL=loading.js.map