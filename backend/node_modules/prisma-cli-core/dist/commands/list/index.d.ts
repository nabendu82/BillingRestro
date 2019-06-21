import { Command } from 'prisma-cli-engine';
export interface Project {
    name: string;
    stage: string;
    cluster: string;
}
export default class List extends Command {
    static topic: string;
    static description: string;
    static group: string;
    static aliases: string[];
    run(): Promise<void>;
    printProjects(projects: Project[], gotCloud: boolean): void;
}
