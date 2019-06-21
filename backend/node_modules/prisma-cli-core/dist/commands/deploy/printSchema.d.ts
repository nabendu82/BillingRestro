import { Client } from 'prisma-cli-engine';
export declare function fetchAndPrintSchema(client: Client, serviceName: string, stageName: string, token?: string, workspaceSlug?: string): Promise<string>;
