import 'source-map-support/register';
import { Arg, Flags } from './Flags/index';
import { Command } from './Command';
export interface ParserSettings {
    flags?: Flags;
    args?: Arg[];
    cmd?: Command;
    variableArgs?: boolean;
}
export interface ParserOutput {
    argv?: string[];
    args?: OutputFlags;
    flags?: OutputArgs;
}
export interface OutputFlags {
    [name: string]: any;
}
export interface OutputArgs {
    [name: string]: string | boolean;
}
export declare class Parser {
    input: ParserSettings;
    constructor(input: ParserSettings);
    parse(output?: ParserOutput): Promise<ParserOutput>;
}
