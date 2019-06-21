import { Command } from 'prisma-cli-engine';
export default class Account extends Command {
    static topic: string;
    static description: string;
    static group: string;
    run(): Promise<void>;
}
