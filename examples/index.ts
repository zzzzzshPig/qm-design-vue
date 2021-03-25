import Vue from 'vue'
import App from './App.vue'
import { table } from 'qm-design-vue'

Vue.use(table)

new Vue({
    el: '#app',
    render: h => h(App)
})
