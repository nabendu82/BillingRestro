"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_config_1 = require("graphql-config");
var lodash_1 = require("lodash");
function getSchemaPathFromConfig(rootDir) {
    try {
        var config = graphql_config_1.getGraphQLConfig(rootDir).config;
        if (config) {
            // first look on top-level
            if (config.extensions && config.extensions.prisma && config.schemaPath) {
                return config.schemaPath;
            }
            var prismaProject = lodash_1.values(config.projects).find(function (p) { return p.extensions && p.extensions.prisma; });
            if (prismaProject && prismaProject.schemaPath) {
                return prismaProject.schemaPath;
            }
        }
    }
    catch (e) {
        //
    }
    return null;
}
exports.getSchemaPathFromConfig = getSchemaPathFromConfig;
//# sourceMappingURL=getSchemaPathFromConfig.js.map