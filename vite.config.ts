import svg from 'vite-plugin-svgo';
import {rollupPluginSpglsl} from 'spglsl';
// @ts-ignore
import {advzipPlugin, defaultViteBuildOptions, ectPlugin, roadrollerPlugin} from 'js13k-vite-plugins';
// @ts-ignore
import kontra from 'rollup-plugin-kontra';
import {defineConfig} from 'vite';

export default defineConfig({
    build: defaultViteBuildOptions,
    plugins: [
        svg({
            multipass: true,
        }),
        rollupPluginSpglsl({
            minify: true,
            mangle: true,
        }),
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