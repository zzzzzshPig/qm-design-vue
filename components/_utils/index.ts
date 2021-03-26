import { VueConstructor, PluginObject } from 'vue'

export const withInstall = <T>(comp: T) => {
    const c = comp as any

    c.install = function (app: VueConstructor) {
        app.component(c.displayName || c.name, comp)
    }

    return comp as T & PluginObject<T>
}
