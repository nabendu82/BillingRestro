"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const loading_1 = require("./loading");
const validation_1 = require("./validation");
const compiler_1 = require("./compiler");
const legacyIR_1 = require("./compiler/legacyIR");
const serializeToJSON_1 = require("./serializeToJSON");
const swift_1 = require("./swift");
const typescript_1 = require("./typescript");
const flow_1 = require("./flow");
const flow_2 = require("./javascript/flow");
const typescript_2 = require("./javascript/typescript");
const scala_1 = require("./scala");
function generate(inputPaths, schemaPath, outputPath, only, target, tagName, projectName, options) {
    const schema = schemaPath == null
        ? loading_1.loadSchemaFromConfig(projectName)
        : loading_1.loadSchema(schemaPath);
    const document = loading_1.loadAndMergeQueryDocuments(inputPaths, tagName);
    validation_1.validateQueryDocument(schema, document);
    if (target === 'swift') {
        options.addTypename = true;
        const context = compiler_1.compileToIR(schema, document, options);
        const outputIndividualFiles = fs.existsSync(outputPath) && fs.statSync(outputPath).isDirectory();
        const generator = swift_1.generateSource(context, outputIndividualFiles, only);
        if (outputIndividualFiles) {
            writeGeneratedFiles(generator.generatedFiles, outputPath);
        }
        else {
            fs.writeFileSync(outputPath, generator.output);
        }
        if (options.generateOperationIds) {
            writeOperationIdsMap(context);
        }
    }
    else if (target === 'flow-modern' || target === 'typescript-modern' || target === 'ts-modern') {
        const context = compiler_1.compileToIR(schema, document, options);
        const generatedFiles = target === 'flow-modern'
            ? flow_2.generateSource(context)
            : typescript_2.generateSource(context);
        const filesByOutputDirectory = {};
        Object.keys(generatedFiles)
            .forEach((filePath) => {
            const outputDirectory = path.dirname(filePath);
            if (!filesByOutputDirectory[outputDirectory]) {
                filesByOutputDirectory[outputDirectory] = {
                    [path.basename(filePath)]: generatedFiles[filePath]
                };
            }
            else {
                filesByOutputDirectory[outputDirectory][path.basename(filePath)] = generatedFiles[filePath];
            }
        });
        Object.keys(filesByOutputDirectory)
            .forEach((outputDirectory) => {
            writeGeneratedFiles(filesByOutputDirectory[outputDirectory], outputDirectory);
        });
    }
    else {
        let output;
        const context = legacyIR_1.compileToLegacyIR(schema, document, options);
        switch (target) {
            case 'json':
                output = serializeToJSON_1.default(context);
                break;
            case 'ts':
            case 'typescript':
                output = typescript_1.generateSource(context);
                break;
            case 'flow':
                output = flow_1.generateSource(context);
                break;
            case 'scala':
                output = scala_1.generateSource(context, options);
        }
        if (outputPath) {
            fs.writeFileSync(outputPath, output);
        }
        else {
            console.log(output);
        }
    }
}
exports.default = generate;
function writeGeneratedFiles(generatedFiles, outputDirectory) {
    rimraf.sync(outputDirectory);
    fs.mkdirSync(outputDirectory);
    for (const [fileName, generatedFile] of Object.entries(generatedFiles)) {
        fs.writeFileSync(path.join(outputDirectory, fileName), generatedFile.output);
    }
}
function writeOperationIdsMap(context) {
    let operationIdsMap = {};
    Object.keys(context.operations).map(k => context.operations[k]).forEach(operation => {
        operationIdsMap[operation.operationId] = {
            name: operation.operationName,
            source: operation.sourceWithFragments
        };
    });
    fs.writeFileSync(context.options.operationIdsPath, JSON.stringify(operationIdsMap, null, 2));
}
//# sourceMappingURL=generate.js.map