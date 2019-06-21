import { Config } from '../Config';
export declare class CommandManagerBase {
    config: Config;
    constructor(config: Config);
    findCommand(id: string): Promise<any>;
    listTopics(prefix?: string): Promise<string[]>;
    findTopic(id: string): Promise<any>;
    require(p: string): any;
}
export declare class BuiltinCommandManager extends CommandManagerBase {
    findCommand(id: any): Promise<any>;
    listTopics(prefix?: string): Promise<string[]>;
}
export declare class CLICommandManager extends CommandManagerBase {
    findCommand(id: any): Promise<any>;
}
export declare class Dispatcher {
    config: Config;
    managers: CommandManagerBase[];
    constructor(config: Config);
    findCommand(id: string): Promise<{
        Command?: any;
        plugin?: Plugin;
    }>;
    findTopic(id: string): Promise<any>;
    listTopics(prefix?: string): Promise<string[]>;
    readonly cmdAskingForHelp: boolean;
}
