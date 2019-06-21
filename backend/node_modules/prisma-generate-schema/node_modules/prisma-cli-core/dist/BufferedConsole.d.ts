import { Console } from 'console';
export default class BufferedConsole extends Console {
    static write(buffer: any, type: any, message: any, level?: number): any;
    _buffer: any;
    constructor();
    log(): void;
    info(): void;
    warn(): void;
    error(): void;
    getBuffer(): any;
}
