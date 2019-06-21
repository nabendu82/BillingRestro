#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const process = require("process");
const path = require("path");
const yargs = require("yargs");
const _1 = require(".");
const errors_1 = require("./errors");
require("source-map-support/register");
process.on('unhandledRejection', (error) => { throw error; });
process.on('uncaughtException', handleError);
function handleError(error) {
    errors_1.logError(error);
    process.exit(1);
}
yargs
    .command(['introspect-schema <schema>', 'download-schema'], 'Generate an introspection JSON from a local GraphQL file or from a remote GraphQL server', {
    output: {
        demand: true,
        describe: 'Output path for GraphQL schema file',
        default: 'schema.json',
        normalize: true,
        coerce: path.resolve,
    },
    header: {
        alias: 'H',
        describe: 'Additional header to send to the server as part of the introspection query request',
        type: 'array',
        coerce: (arg) => {
            let additionalHeaders = {};
            for (const header of arg) {
                const separator = header.indexOf(":");
                const name = header.substring(0, separator).trim();
                const value = header.substring(separator + 1).trim();
                if (!(name && value)) {
                    throw new errors_1.ToolError('Headers should be specified as "Name: Value"');
                }
                additionalHeaders[name] = value;
            }
            return additionalHeaders;
        }
    },
    insecure: {
        alias: 'K',
        describe: 'Allows "insecure" SSL connection to the server',
        type: 'boolean'
    },
    method: {
        demand: false,
        describe: 'The HTTP request method to use for the introspection query request',
        type: 'string',
        default: 'POST',
        choices: ['POST', 'GET', 'post', 'get']
    }
}, (argv) => __awaiter(this, void 0, void 0, function* () {
    const { schema, output, header, insecure, method } = argv;
    const urlRegex = /^https?:\/\//i;
    if (urlRegex.test(schema)) {
        yield _1.downloadSchema(schema, output, header, insecure, method);
    }
    else {
        yield _1.introspectSchema(schema, output);
    }
}))
    .command(['print-schema [schema]'], 'Print the provided schema in the GraphQL schema language format', {
    schema: {
        demand: true,
        describe: 'Path to GraphQL introspection query result',
        default: 'schema.json',
        normalize: true,
        coerce: path.resolve,
    },
    output: {
        demand: true,
        describe: 'Output path for GraphQL schema language file',
        default: 'schema.graphql',
        normalize: true,
        coerce: path.resolve,
    }
}, (argv) => __awaiter(this, void 0, void 0, function* () {
    const { schema, output } = argv;
    yield _1.printSchema(schema, output);
}))
    .command('generate [input...]', 'Generate code from a GraphQL schema and query documents', {
    schema: {
        demand: false,
        describe: 'Path to GraphQL schema file. (Defaults to using .graphqlconfig or schema.json)',
        normalize: true,
        coerce: path.resolve,
    },
    output: {
        describe: 'Output directory for the generated files',
        normalize: true,
        coerce: path.resolve,
    },
    target: {
        demand: false,
        describe: 'Code generation target language',
        choices: ['swift', 'scala', 'json', 'ts', 'ts-modern', 'typescript', 'typescript-modern', 'flow', 'flow-modern'],
        default: 'swift'
    },
    only: {
        describe: 'Parse all input files, but only output generated code for the specified file [Swift only]',
        normalize: true,
        coerce: path.resolve,
    },
    namespace: {
        demand: false,
        describe: 'Optional namespace for generated types [currently Swift and Scala-only]',
        type: 'string'
    },
    "passthrough-custom-scalars": {
        demand: false,
        describe: "Don't attempt to map custom scalars [temporary option]",
        default: false
    },
    "custom-scalars-prefix": {
        demand: false,
        describe: "Prefix for custom scalars. (Implies that passthrough-custom-scalars is true if set)",
        default: '',
        normalize: true
    },
    "add-typename": {
        demand: false,
        describe: "For non-swift targets, always add the __typename GraphQL introspection type when generating target types",
        default: false
    },
    "use-flow-exact-objects": {
        demand: false,
        describe: "Use Flow exact objects for generated types [flow-modern only]",
        default: false,
        type: 'boolean'
    },
    "use-flow-read-only-types": {
        demand: false,
        describe: "Use Flow read only types for generated types [flow-modern only]",
        default: false,
        type: 'boolean'
    },
    "tag-name": {
        demand: false,
        describe: "Name of the template literal tag used to identify template literals containing GraphQL queries in Javascript/Typescript code",
        default: 'gql'
    },
    "project-name": {
        demand: false,
        describe: "Name of the project to use in a multi-project .graphqlconfig file",
    },
    "operation-ids-path": {
        demand: false,
        describe: "Path to an operation id JSON map file. If specified, also stores the operation ids (hashes) as properties on operation types [currently Swift-only]",
        default: null,
        normalize: true
    },
    "merge-in-fields-from-fragment-spreads": {
        demand: false,
        describe: "Merge fragment fields onto its enclosing type",
        default: true,
        type: 'boolean'
    }
}, argv => {
    let { input } = argv;
    if (input.length === 1 && glob.hasMagic(input[0])) {
        input = glob.sync(input[0]);
    }
    const inputPaths = input
        .map(input => path.resolve(input))
        .sort();
    const options = {
        passthroughCustomScalars: argv["passthrough-custom-scalars"] || argv["custom-scalars-prefix"] !== '',
        customScalarsPrefix: argv["custom-scalars-prefix"] || '',
        addTypename: argv["add-typename"],
        namespace: argv.namespace,
        operationIdsPath: argv["operation-ids-path"],
        generateOperationIds: !!argv["operation-ids-path"],
        mergeInFieldsFromFragmentSpreads: argv["merge-in-fields-from-fragment-spreads"],
        useFlowExactObjects: argv['use-flow-exact-objects'],
        useFlowReadOnlyTypes: argv['use-flow-read-only-types'],
    };
    _1.generate(inputPaths, argv.schema, argv.output, argv.only, argv.target, argv.tagName, argv.projectName, options);
})
    .fail(function (message, error) {
    handleError(error ? error : new errors_1.ToolError(message));
})
    .help()
    .version()
    .strict()
    .argv;
//# sourceMappingURL=cli.js.map