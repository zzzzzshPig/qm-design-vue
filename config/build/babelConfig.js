module.exports = (modules) => {
    modules = modules ? false : 'cjs'

    return {
        presets: [
            [
                require('@babel/preset-env'),
                {
                    modules,
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
                require('babel-plugin-import'),
                {
                    libraryName: 'ant-design-vue',
                    libraryDirectory: modules ? 'lib' : 'es',
                    style: true
                }
            ]
        ]
    }
}
