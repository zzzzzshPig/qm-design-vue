const baseConfig = require('./webpack.base')
const path = require('path')

module.exports = {
    ...baseConfig,
    target: 'web',
    mode: 'development',
    entry: './examples/index.ts',
    resolve: {
        alias: {
            'qm-design-vue': path.join(__dirname, '../components'),
            'qm-design-vue-es': path.join(__dirname, '../es'),
            'qm-design-vue-lib': path.join(__dirname, '../lib')
        },
        extensions: ['.ts', '.js', '.vue']
    },
    devServer: {
        historyApiFallback: {
            rewrites: [{ from: /./, to: '/index.html' }]
        },
        disableHostCheck: true,
        hot: true,
        open: true,
        port: 8080
    }
}
