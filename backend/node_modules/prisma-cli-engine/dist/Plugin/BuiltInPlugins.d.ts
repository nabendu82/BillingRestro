import { Manager } from './Manager';
import { PluginPath } from './PluginPath';
export default class BuiltinPlugins extends Manager {
    /**
     * list builtin plugins
     * @returns {PluginPath[]}
     */
    list(): Promise<PluginPath[]>;
}
