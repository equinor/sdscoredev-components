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
        'prettier/prettier': 'warn',
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'react/jsx-filename-extension': [0],
        'eslint/indent:': 0,
        indent: ['off', 4],
        'no-use-before-define': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-curly-newline': 'off',
        'no-unused-vars': 'off',
        'react/require-default-props': 'off',
        'no-shadow': 'off',
        'arrow-parens': 'warn',
        'react/prop-types': 0,
        'react/jsx-wrap-multilines': 0,
        'comma-dangle': 0,
        'dot-notation': 'off',
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/prefer-default-export': 'off',
        'no-console': process.env.NODE_ENV === 'prod' ? 1 : 0,
        'class-methods-use-this': 0,
        'react/destructuring-assignment': 0,
        'react/function-component-definition': 0,
        'react/no-unused-prop-types': 'off',
        'arrow-body-style': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'default-param-last': 'off',
        'no-unsafe-optional-chaining': 'off',
    },
};
