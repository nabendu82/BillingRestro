export declare const command = "init";
export declare const describe = "Setup .graphqlconfig file";
import { Context } from '../';
export declare function handler(context: Context): Promise<void>;
export declare function addEndpoint(prompt: Context['prompt'], extensionEndpoints: any): Promise<any>;
