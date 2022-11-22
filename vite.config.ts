import { resolve } from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'index',
            fileName: 'index',
        },
    },
    plugins: [
        eslint(),
        stylelint({
            fix: true,
            include: [
                './src/**/*.scss'
            ],
        }),
        dts(),
    ],
})
