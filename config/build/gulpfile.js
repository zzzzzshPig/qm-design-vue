const gulp = require('gulp')
const path = require('path')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const merge2 = require('merge2')
const fs = require('fs')
const { getProjectPath } = require('./utils')
const tsConfig = require(getProjectPath('tsconfig.json')).compilerOptions
const babelConfig = require('./babelConfig')
const less = require('gulp-less')
const Autoprefix = require('less-plugin-autoprefix')
const autoprefix = new Autoprefix()
const through2 = require('through2')

// fix tsConfig types path不正确
tsConfig.types[1] = getProjectPath() + tsConfig.types[1]

// 清空dist es lib
const dirs = ['es', 'lib', 'dist']
dirs.forEach(a => {
    fs.rmdirSync(path.join(__dirname, getProjectPath(), a), { recursive: true })
})

function transformVue () {
    return through2.obj((file, _, cb) => {
        const contents = file.contents.toString()

        file.contents = Buffer.from(
            contents
                .replace('src="./index.ts"', 'src="./index.js"')
                .replace('lang="ts"', 'lang="js"')
        )

        cb(null, file)
    })
}

function compile (module = true) {
    const output = getProjectPath(module ? 'es' : 'lib')
    const cmpPath = '../../components'

    const vue = gulp
        .src(`${cmpPath}/**/*.vue`)
        .pipe(transformVue())
        .pipe(gulp.dest(output))

    const typescript = gulp
        .src(`${cmpPath}/**/*.ts`)
        .pipe(ts(tsConfig))
        .pipe(babel(babelConfig(module)))
        .pipe(gulp.dest(output))

    const ls = gulp
        .src(`${cmpPath}/**/*.less`)
        .pipe(gulp.dest(output))
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(output))

    return merge2([vue, typescript, ls])
}

const lib = () => compile(false)

const es = () => compile()

exports.default = gulp.parallel(lib, es)
