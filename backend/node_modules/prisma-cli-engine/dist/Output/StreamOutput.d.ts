/// <reference types="node" />
import { Output } from './';
export declare function logToFile(msg: string, logfile: string): void;
export default class StreamOutput {
    static startOfLine: boolean;
    output: string;
    stream: NodeJS.WriteStream;
    out: Output;
    logfile?: string;
    constructor(stream: NodeJS.WriteStream, output: Output);
    write(msg: string, options?: {
        log?: boolean;
    }): void;
    timestamp(msg: string): string;
    log(data: string, ...args: any[]): void;
    writeLogFile(msg: string, withTimestamp: boolean): void;
    readonly displayTimestamps: boolean;
}
