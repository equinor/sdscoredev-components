import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';

const path = require('path');

const watcherOptions = {};

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: 'localhost',
        port: 3005,
    },
    plugins: [react()],
    build: {
        sourcemap: true,
        cssCodeSplit: false,
        watch: watcherOptions,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'MyLib',
            formats: ['es', 'umd'],
            fileName: (format) => `my-lib.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'styled-components', 'react-router-dom'],
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
        },
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, './components'),
        },
    },
});
