import { Command, Flags } from 'prisma-cli-engine';
export default class Token extends Command {
    static topic: string;
    static description: string;
    static flags: Flags;
    run(): Promise<void>;
}
