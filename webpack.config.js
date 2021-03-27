const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babelConfig = {
    cacheDirectory: true,
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        '> 1%',
                        'ie >= 11',
                        'iOS >= 8',
                        'Android >= 4'
                    ]
                }
            }
        ]
    ],
    plugins: [
        [
            'babel-plugin-import',
            {
                libraryName: 'ant-design-vue',
                libraryDirectory: 'es',
                style: true
            }
        ]
    ]
}

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
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelConfig
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: ['\\.vue$'],
                            happyPackMode: false
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelConfig
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
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
    externals: ['vue', 'ant-design-vue'],
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
