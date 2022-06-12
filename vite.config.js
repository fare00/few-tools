import { defineConfig } from "vite";
import path from 'path';
import makeManifest from "./plugins/make-manifest";

export default defineConfig({
    root: path.resolve(__dirname, 'src'),
    plugins: [makeManifest()],
    build: {
        /* emptyOutDir: true, */
        outDir: path.resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                background: 'src/background.js',
                contentscript: 'src/contentscript.js',
                'popup/index': 'src/popup/index.html',
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
            
        },
    }
})