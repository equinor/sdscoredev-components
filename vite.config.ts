import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const path = require('path');

const watcherOptions = {};

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: 'localhost',
        port: 3005,
    },
    plugins: [
        // {
        //     ...typescript({ tsconfig: './tsconfig.json' }),
        //     apply: 'build',
        // },
        react(),
        dts(),
    ],
    build: {
        target: 'esnext',
        sourcemap: false,
        watch: watcherOptions,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'index',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'styled-components', 'react-router-dom'],
            output: {
                sourcemap: false,
                globals: {
                    react: 'react',
                    'react-dom': 'reactDom',
                    'styled-components': 'styled',
                    'react-router-dom': 'reactRouterDom',
                },
            },
            // output: {
            //     // Provide global variables to use in the UMD build
            //     // for externalized deps
            //     globals: {
            //         react: 'react',
            //         reactDom: 'react-dom',
            //         styled: 'styled-components',
            //         reactRouterDom: 'react-router-dom',
            //     },
            // },
            // output: [
            //     {s
            //         format: 'cjs',
            //         file: packageJson.main,
            //         exports: 'named',
            //         sourcemap: false,
            //     },
            //     {
            //         format: 'es',
            //         file: packageJson.module,
            //         exports: 'named',
            //         sourcemap: false,
            //     },
            // ],
        },
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, './components'),
        },
    },
});
