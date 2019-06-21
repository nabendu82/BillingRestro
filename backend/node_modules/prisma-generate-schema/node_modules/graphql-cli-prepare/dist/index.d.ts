/// <reference types="yargs" />
import { CommandBuilder } from 'yargs';
declare const command: {
    command: string;
    describe?: string;
    handler: (context: any, argv: any) => any;
    builder?: CommandBuilder;
};
export = command;
