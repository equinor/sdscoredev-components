import { nodeResolve } from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    input: 'src/index.ts',
    sourcemap: false,
    treeshake: false,
    output: [
        {
            format: 'cjs',
            file: packageJson.main,
            exports: 'named',
            sourcemap: false,
        },
        {
            format: 'es',
            file: packageJson.module,
            exports: 'named',
            sourcemap: false,
        },
    ],
    external: ['react', 'react-dom', 'styled-components', 'react-router-dom'],
    plugins: [
        nodeResolve(),
        commonjs({
            include: ['node_modules/**'],
        }),
        external(),
        typescript({
            check: false,
            clean: true,
            exclude: ['node_modules'],
        }),
    ],
};
