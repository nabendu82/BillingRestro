import { Region } from '../types/common';
export declare const regions: Region[];
export declare function getPing(region: Region): Promise<number>;
export declare function getFastestRegion(): Promise<Region>;
export declare const getDynamoUrl: (region: string) => string;
