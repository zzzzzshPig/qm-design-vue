const baseConfig = require('./webpack.base')

module.exports = {
    ...baseConfig,
    mode: 'production',
    entry: './components/index.ts',
    externals: ['vue', 'ant-design-vue']
}
