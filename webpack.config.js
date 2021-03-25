const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: './examples/index.ts',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, '/dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'examples/index.html',
            filename: 'index.html',
            inject: true
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'qm-design-vue': path.join(__dirname, './components')
        },
        extensions: ['.ts', '.js', '.vue']
    },
    devtool: 'cheap-source-map',
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
