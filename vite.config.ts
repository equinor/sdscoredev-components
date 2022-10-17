import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const path = require('path');

const watcherOptions = {};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [dts(), react()],
    build: {
        target: 'esnext',
        sourcemap: true,
        emptyOutDir: false,
        watch: watcherOptions,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'index',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'styled-components', 'react-router-dom'],
            output: {
                sourcemap: true,
                globals: {
                    react: 'react',
                    'react-dom': 'reactDom',
                    'styled-components': 'styled',
                    'react-router-dom': 'reactRouterDom',
                },
            },
        },
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, './components'),
        },
    },
});
