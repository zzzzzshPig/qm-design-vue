import { VueConstructor } from 'vue'

import table from './table/config'

export {
    table
}

const components = {
    table
}

export default {
    install (app: VueConstructor) {
        Object.values(components).forEach(a => {
            app.component(a.name, a)
        })
    }
}
