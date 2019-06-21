import { Command } from './Command';
import { Config } from './Config';
import { RunOptions } from './types/common';
export declare class CLI {
    config: Config;
    cmd: Command;
    notifier: any;
    constructor({ config }?: {
        config?: RunOptions;
    });
    run(): Promise<void>;
    initRaven(): void;
    setRavenUserContext(): void;
    flush(): Promise<{} | void>;
    readonly cmdAskingForHelp: boolean;
    readonly Help: any;
}
export declare function run({ config }?: {
    config?: RunOptions;
}): void;
