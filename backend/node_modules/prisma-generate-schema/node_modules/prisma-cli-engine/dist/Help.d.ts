import { Arg } from './Flags/index';
import { Output } from './Output/index';
import { Config } from './Config';
export default class Help {
    config: Config;
    out: Output;
    constructor(config: Config, output?: Output);
    command(cmd: any): string;
    commandLine(cmd: any): string[];
    renderAliases(aliases?: string[]): string;
    renderArgs(args: Arg[]): string;
    renderFlags(flags: any): string;
}
