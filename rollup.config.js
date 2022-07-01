import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import css from 'rollup-plugin-import-css';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    input: 'src/index.ts',
    output: [
        {
            format: 'cjs',
            file: packageJson.main,
            exports: 'named',
            sourcemap: true,
        },
        {
            format: 'es',
            file: packageJson.module,
            exports: 'named',
            sourcemap: true,
        },
    ],
    external: ['react', 'react-dom', 'styled-components', 'react-router-dom'],
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: true,
            extensions: ['.ts', '.tsx'],
        }),
        commonjs({
            include: ['node_modules/**'],
        }),
        external(),
        typescript({
            clean: true,
            rollupCommonJSResolveHack: true,
            exclude: ['node_modules'],
        }),
        css(),
    ],
};
