import { Manager } from './Manager';
import { PluginPath } from './PluginPath';
export default class CorePlugins extends Manager {
    /**
     * list core plugins
     * @returns {PluginPath[]}
     */
    list(): Promise<PluginPath[]>;
}
