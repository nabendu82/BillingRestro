"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const common_tags_1 = require("common-tags");
const graphql_1 = require("graphql");
const graphql_config_1 = require("graphql-config");
const errors_1 = require("./errors");
function loadSchema(schemaPath) {
    if (!fs.existsSync(schemaPath)) {
        throw new errors_1.ToolError(`Cannot find GraphQL schema file: ${schemaPath}`);
    }
    const schemaData = require(schemaPath);
    if (!schemaData.data && !schemaData.__schema) {
        throw new errors_1.ToolError('GraphQL schema file should contain a valid GraphQL introspection query result');
    }
    return graphql_1.buildClientSchema((schemaData.data) ? schemaData.data : schemaData);
}
exports.loadSchema = loadSchema;
function loadSchemaFromConfig(projectName) {
    try {
        const config = graphql_config_1.getGraphQLProjectConfig('.', projectName);
        return config.getSchema();
    }
    catch (e) {
        if (!(e instanceof graphql_config_1.ConfigNotFoundError)) {
            throw e;
        }
    }
    const defaultSchemaPath = 'schema.json';
    if (fs.existsSync(defaultSchemaPath)) {
        return loadSchema('schema.json');
    }
    throw new errors_1.ToolError(`No GraphQL schema specified. There must either be a .graphqlconfig or a ${defaultSchemaPath} file present, or you must use the --schema option.`);
}
exports.loadSchemaFromConfig = loadSchemaFromConfig;
function maybeCommentedOut(content) {
    return (content.indexOf('/*') > -1 && content.indexOf('*/') > -1) ||
        content.split('//').length > 1;
}
function filterValidDocuments(documents) {
    return documents.filter(document => {
        const source = new graphql_1.Source(document);
        try {
            graphql_1.parse(source);
            return true;
        }
        catch (e) {
            if (!maybeCommentedOut(document)) {
                console.warn(common_tags_1.stripIndents `
            Failed to parse:

            ${document.trim().split('\n')[0]}...
          `);
            }
            return false;
        }
    });
}
function extractDocumentFromJavascript(content, options = {}) {
    let tagName = options.tagName || 'gql';
    const re = new RegExp(tagName + '\s*`([^`]*)`', 'g');
    let match;
    let matches = [];
    while (match = re.exec(content)) {
        const doc = match[1]
            .replace(/\${[^}]*}/g, '');
        matches.push(doc);
    }
    matches = filterValidDocuments(matches);
    const doc = matches.join('\n');
    return doc.length ? doc : null;
}
exports.extractDocumentFromJavascript = extractDocumentFromJavascript;
function loadAndMergeQueryDocuments(inputPaths, tagName = 'gql') {
    const sources = inputPaths.map(inputPath => {
        const body = fs.readFileSync(inputPath, 'utf8');
        if (!body) {
            return null;
        }
        if (inputPath.endsWith('.jsx') || inputPath.endsWith('.js')
            || inputPath.endsWith('.tsx') || inputPath.endsWith('.ts')) {
            const doc = extractDocumentFromJavascript(body.toString(), { tagName });
            return doc ? new graphql_1.Source(doc, inputPath) : null;
        }
        return new graphql_1.Source(body, inputPath);
    }).filter(source => source);
    return graphql_1.concatAST(sources.map(source => graphql_1.parse(source)));
}
exports.loadAndMergeQueryDocuments = loadAndMergeQueryDocuments;
//# sourceMappingURL=loading.js.map