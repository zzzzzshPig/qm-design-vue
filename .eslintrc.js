module.exports = {
    root: true,
    env: {
        node: true
    },
    ignorePatterns: ['*.d.ts', '*.html'],
    extends: [
        '@vue/standard',
        'plugin:vue/essential',
        'typescript'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 12
    },
    rules: {
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        'no-unused-vars': 'off',
        'no-new': 'off'
    }
}
