/// <reference types="yargs" />
import { Arguments } from 'yargs';
import { GraphQLSchema, ExecutionResult } from 'graphql';
export declare type CodegenConfigs = CodegenConfig[] | CodegenConfig;
export interface CodegenConfig {
    input: CodegenInput;
    output: CodegenOutput;
    language: string;
    generator: string;
}
export declare type CodegenInput = CodegenInputObject | string;
export interface CodegenInputObject {
    schema: string;
    typeDefs: string;
}
export interface CodegenOutput {
    binding: string;
    typeDefs: string;
    typings: string;
}
export declare class Codegen {
    private context;
    private argv;
    private config;
    private projectName;
    private project;
    constructor(context: any, argv: Arguments);
    handle(): Promise<void>;
    private setCurrentProject(project, projectName);
    private codegen();
    private getInputSchemaPath(input?);
    private getProjectConfig();
    private projectDisplayName;
}
export declare function introspect(schema: GraphQLSchema): Promise<ExecutionResult>;
