module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: false
    },
    plugins: [`node`, `promise`, `standard`],
    rules: {
        indent: [
            `error`,
            4,
            {
                SwitchCase: 1
            }
        ],
        semi: [`error`, `never`],
        quotes: [`error`, `backtick`],
        'comma-dangle': [`error`, `never`],
        'comma-spacing': [
            `error`,
            {
                before: false,
                after: true
            }
        ],
        'arrow-parens': [`warn`, `as-needed`],
        'prefer-const': `warn`,
        curly: `warn`,
        'no-unused-vars': [
            `warn`,
            {
                vars: `all`,
                args: `after-used`,
                ignoreRestSiblings: false
            }
        ],
        'object-curly-newline': [
            `error`,
            {
                ObjectExpression: {
                    minProperties: 1,
                    multiline: true
                },
                ObjectPattern: {
                    multiline: true
                },
                ImportDeclaration: `never`,
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 3
                }
            }
        ],
        'object-curly-spacing': [`error`, `always`],
        'no-warning-comments': `warn`,
        'require-await': `warn`
    },
    parser: `babel-eslint`,
    parserOptions: {
        ecmaVersion: 11
    }
}
