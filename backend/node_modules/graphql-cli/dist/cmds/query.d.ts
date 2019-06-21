export declare const command = "query <file>";
export declare const describe = "Run query/mutation";
import { Context } from '../';
export declare const builder: {
    endpoint: {
        alias: string;
        describe: string;
        type: string;
    };
    operation: {
        alias: string;
        describe: string;
        type: string;
    };
    variables: {
        describe: string;
        type: string;
    };
    all: {
        alias: string;
        describe: string;
        type: string;
    };
};
export declare function handler(context: Context, argv: {
    file: string;
    operation: string;
    endpoint: string;
    all: boolean;
    variables: string;
}): Promise<void>;
