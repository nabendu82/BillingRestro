export declare const command = "ping";
export declare const describe = "Ping GraphQL endpoint";
export declare const builder: {
    endpoint: {
        alias: string;
        describe: string;
        type: string;
    };
};
import { Context } from '../';
export declare function handler(context: Context, argv: {
    endpoint: string;
}): Promise<void>;
