import svg from 'vite-plugin-svgo';
import {rollupPluginSpglsl} from 'spglsl';
import copy from "rollup-plugin-copy";

// @ts-ignore
import {
    advzipPlugin,
    defaultViteBuildOptions,
    defaultRollupOptions,
    ectPlugin,
    roadrollerPlugin,
    googleClosurePlugin
} from 'js13k-vite-plugins';
// @ts-ignore
import kontra from 'rollup-plugin-kontra';
import {BuildOptions, defineConfig} from 'vite';

const viteOptions: BuildOptions = {
    ...defaultViteBuildOptions,
    // rollupOptions: {
    //     ...defaultRollupOptions,
    //     output: {
    //         dir: 'bundle',
    //         format: 'iife',
    //     },
    // }
}

export default defineConfig({
    build: viteOptions,
    plugins: [
        svg({
            multipass: true,
        }),
        rollupPluginSpglsl({
            minify: true,
            mangle: true,
        }),
        // googleClosurePlugin(),
        roadrollerPlugin(),
        ectPlugin(),
        advzipPlugin(),
        kontra({
            gameObject: {
                scale: true,
                group: true,
                anchor: true,
                rotation: true,
            },
            sprite: {
                animation: true,
            },
            vector: {
                normalize: true,
            },
            debug: false
        }),
    ],
});