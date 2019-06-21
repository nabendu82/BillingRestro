import 'source-map-support/register';
import { Config } from '../Config';
import { Output } from '../Output/index';
export default class Lock {
    config: Config;
    out: Output;
    constructor(output: Output);
    readonly updatelockfile: string;
    read(): Promise<() => Promise<void>>;
    unread(): Promise<void>;
    canRead(): Promise<boolean>;
    upgrade(): Promise<() => Promise<() => Promise<void>>>;
}
