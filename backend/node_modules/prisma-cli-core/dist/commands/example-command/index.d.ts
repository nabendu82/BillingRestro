import { Command, Flags } from 'prisma-cli-engine';
export default class ExampleCommand extends Command {
    static topic: string;
    static command: string;
    static description: string;
    static flags: Flags;
    run(): Promise<void>;
}
