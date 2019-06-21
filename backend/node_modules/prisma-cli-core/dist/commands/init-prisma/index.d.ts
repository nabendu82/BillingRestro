import { Command } from 'prisma-cli-engine';
export default class InitPrisma extends Command {
    static topic: string;
    static description: string;
    run(): Promise<void>;
}
