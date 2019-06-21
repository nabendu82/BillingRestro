import { Output } from '../';
export declare function shouldDisplaySpinner(out: Output): boolean;
export interface Task {
    action: string;
    status?: string;
    active?: boolean;
}
export declare class ActionBase {
    task?: Task;
    out: Output;
    constructor(out: Output);
    start(action: string, status?: string): void;
    stop(msg?: string): void;
    status: string | undefined;
    pause(fn?: () => any, icon?: string): any;
    log({ action, status }: {
        action: string;
        status?: string;
    }): void;
    _start(): void;
    _stop(): void;
    resume(): void;
    _pause(icon?: string): void;
    _updateStatus(status: string, prevStatus?: string): void;
}
