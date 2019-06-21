import { Output } from './index';
export interface PromptOptions {
    name?: string;
    prompt?: string;
    mask?: boolean;
    hide?: boolean;
}
export default class Prompter {
    out: Output;
    constructor(out: Output);
    prompt(name: string, options?: PromptOptions): Promise<string>;
    promptMasked(options: PromptOptions): Promise<string>;
}
