import { Output } from '../Output/index';
import { CachedCommand, CachedPlugin, CachedTopic, Group } from './Cache';
import { Config } from '../Config';
import { PluginPath } from './PluginPath';
export default class Plugin {
    pluginPath: PluginPath;
    cachedPlugin: CachedPlugin;
    config: Config;
    out: Output;
    constructor(out: Output, pluginPath: PluginPath, cachedPlugin: CachedPlugin);
    readonly tag: string | void;
    readonly type: string;
    readonly path: string;
    readonly name: string;
    readonly version: string;
    readonly commands: CachedCommand[];
    readonly groups: Group[];
    readonly topics: CachedTopic[];
    findCommand(id: string): Promise<any>;
    findTopic(id: string): Promise<any>;
    buildTopic(t: CachedTopic): any;
}
