"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockDefinition = {
    modules: [
        {
            name: '',
            content: "# Welcome to Prisma!\n#\n# This file is the main config file for your Prisma Project.\n# It's very minimal at this point and uses default values.\n# We've included a hello world function here.\n# Just uncomment it and run `prisma deploy`\n#\n# Check out some examples:\n#    github.com/prisma/examples\n#\n# Happy Coding!\n\n\n# GraphQL types\ntypes: ./types.graphql\n\n\n# uncomment this:\n\n# functions:\n#   hello:\n#     handler:\n#       code:\n#         src: ./code/hello.js\n#     type: resolver\n#     schema: ./code/hello.graphql\n\n \n# Prisma modules\nmodules: {}\n\n\n# Model/Relation permissions\npermissions:\n- operation: \"*\"\n\n  \n# Permanent Auth Token / Root Tokens\nrootTokens: []\n\n",
            files: {
                './types.graphql': "# This file contains the GraphQL Types\n\n# All types need to have the three fields id, updatedAt and createdAt like this:\n\ntype User implements Node {\n  id: ID! @isUnique\n  createdAt: DateTime!\n  updatedAt: DateTime!\n}\n\n\n# Prisma has one special type, the File type:\n\n# type File implements Node {\n#   contentType: String!\n#   createdAt: DateTime!\n#   id: ID! @isUnique\n#   name: String!\n#   secret: String! @isUnique\n#   size: Int!\n#   updatedAt: DateTime!\n#   url: String! @isUnique\n# }\n",
                './code/hello.js': "module.exports = event => {\n  return {\n    data: {\n      message: `Hello ${event.data.name || 'World'}`\n    }\n  }\n}",
                './code/hello.graphql': "type HelloPayload {\n  message: String!\n}\n\nextend type Query {\n  hello(name: String): HelloPayload\n}\n",
            },
        },
    ],
};
exports.mockEnv = {
    default: 'dev',
    environments: {
        dev: 'cj84dopd3197p01200l5sb9fs',
    },
};
//# sourceMappingURL=mock.js.map