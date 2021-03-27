const baseConfig = require('./webpack.base')
const path = require('path')

module.exports = {
    ...baseConfig,
    mode: 'production',
    entry: './components/index.ts',
    externals: ['vue', 'ant-design-vue']
}
