import { Context } from '../..';
export declare const command = "create [directory]";
export declare const describe = "Bootstrap a new GraphQL project";
export declare const builder: {
    boilerplate: {
        alias: string;
        describe: string;
        type: string;
    };
    'no-install': {
        describe: string;
        type: string;
        default: boolean;
    };
};
export declare function handler(context: Context, argv: {
    boilerplate?: string;
    directory?: string;
    noInstall: boolean;
}): Promise<void>;
