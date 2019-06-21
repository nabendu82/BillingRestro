import { Command } from 'prisma-cli-engine';
export default class ConsoleCommand extends Command {
    static topic: string;
    static description: string;
    run(): Promise<void>;
}
