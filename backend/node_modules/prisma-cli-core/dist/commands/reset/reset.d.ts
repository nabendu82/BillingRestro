import { Command, Flags } from 'prisma-cli-engine';
export default class Reset extends Command {
    static topic: string;
    static description: string;
    static group: string;
    static flags: Flags;
    run(): Promise<void>;
    reset(serviceName: any, stageName: any): Promise<void>;
    private askForConfirmation;
}
