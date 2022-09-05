module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es6: true,
    },
    extends: ['airbnb', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        JSX: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'arrow-body-style': 'off',
        'arrow-parens': 'warn',
        'class-methods-use-this': 0,
        'comma-dangle': 0,
        'default-param-last': 'off',
        'dot-notation': 'off',
        'eslint/indent:': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 'off',
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'no-console': process.env.NODE_ENV === 'prod' ? 1 : 0,
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'no-unsafe-optional-chaining': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'prettier/prettier': 'warn',
        'react/destructuring-assignment': 0,
        'react/function-component-definition': 0,
        'react/jsx-curly-newline': 'off',
        'react/jsx-filename-extension': [0],
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-wrap-multilines': 0,
        'react/no-unused-prop-types': 'off',
        'react/prop-types': 0,
        'react/require-default-props': 'off',
        indent: ['off', 4],
    },
};
