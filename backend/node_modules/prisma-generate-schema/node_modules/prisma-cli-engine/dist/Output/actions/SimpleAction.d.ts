import { ActionBase } from './ActionBase';
export declare class SimpleAction extends ActionBase {
    _start(): void;
    _pause(icon?: string): void;
    _resume(): void;
    _updateStatus(status: string, prevStatus?: string): void;
    _stop(): void;
    _render(action: string, status?: string): void;
    _write(s: string): void;
}
