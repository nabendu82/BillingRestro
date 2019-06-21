import { Config } from './Config';
import { Output } from './Output/index';
import Plugins from './Plugin/Plugins';
export declare class NotFound {
    argv: string[];
    config: Config;
    out: Output;
    plugins: Plugins;
    constructor(output: Output, argv: string[]);
    allCommands(): string[];
    closest(cmd: string): any;
    isValidTopic(name: string): Promise<boolean>;
    run(): Promise<void>;
}
