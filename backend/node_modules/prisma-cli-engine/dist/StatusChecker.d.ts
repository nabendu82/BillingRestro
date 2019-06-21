import { Config } from './Config';
import { Environment } from 'prisma-yml';
export declare class StatusChecker {
    config: Config;
    env?: Environment;
    constructor(config: Config, env?: Environment);
    checkStatus(command: string, args: any, flags: any, argv: any[], error?: Error | string): void;
}
export declare function initStatusChecker(config: Config, env?: Environment): StatusChecker;
export declare function getStatusChecker(): StatusChecker | undefined;
export declare function doJobs(cachePath: string, request: any): Promise<void>;
export declare function getFid(): string;
