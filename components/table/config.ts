import table from './index.vue'
import { withInstall } from '../_utils'
import Vue from 'vue'
import { Table } from 'ant-design-vue'

Vue.use(Table)

export default withInstall(table)
