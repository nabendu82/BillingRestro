import { Client, Output, Config } from 'prisma-cli-engine';
export declare type FileType = 'nodes' | 'relations' | 'lists';
export interface ExportRequest {
    fileType: FileType;
    cursor: ExportCursor;
}
export interface ExportCursor {
    table: number;
    row: number;
    field: number;
    array: number;
}
export declare class Exporter {
    client: Client;
    exportPath: string;
    exportDir: string;
    out: Output;
    config: Config;
    constructor(exportPath: string, client: Client, out: Output, config: Config);
    download(serviceName: string, stage: string, token?: string, workspaceSlug?: string): Promise<void>;
    zipIt(): Promise<{}>;
    makeDirs(): void;
    downloadFiles(fileType: FileType, serviceName: string, stage: string, token?: string, workspaceSlug?: string): Promise<void>;
}
