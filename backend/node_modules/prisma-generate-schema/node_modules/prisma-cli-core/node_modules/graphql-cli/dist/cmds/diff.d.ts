export declare const command = "diff";
export declare const describe = "Show a diff between two schemas";
import { Context } from '../';
export declare const builder: (yargs: any) => void;
export declare function handler(context: Context, argv: {
    endpoint: string;
    target: string;
}): Promise<void>;
