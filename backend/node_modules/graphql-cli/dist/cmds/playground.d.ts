import { Context } from '../';
export declare const command = "playground";
export declare const describe = "Open interactive GraphQL Playground";
export declare const builder: {
    port: {
        description: string;
    };
    endpoint: {
        alias: string;
        describe: string;
        type: string;
    };
    web: {
        alias: string;
        describe: string;
        type: string;
    };
    'server-only': {
        describe: string;
        type: string;
        default: boolean;
    };
};
export declare function handler(context: Context, argv: {
    endpoint: string;
    port: string;
    web: boolean;
    serverOnly: boolean;
}): Promise<void>;
