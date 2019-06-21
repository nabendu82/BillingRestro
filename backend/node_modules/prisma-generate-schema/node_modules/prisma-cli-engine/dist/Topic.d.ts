import { Command } from './Command';
import { Output } from './Output/index';
export declare class Topic {
    static topic: string;
    static description?: string;
    static hidden: boolean;
    static group: string;
    commands: Array<typeof Command>;
    out: Output;
    constructor(commands: Array<typeof Command>, out: Output);
    static readonly id: string;
}
