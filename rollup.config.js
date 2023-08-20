import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import kontra from 'rollup-plugin-kontra';
import copy from "rollup-plugin-copy";

export default {
    input: './src/main.ts',
    output: {
        dir: 'bundle',
        format: 'iife',
    },
    sourceMap: 'inline',
    plugins: [
        copy({
            targets: [
                { src: 'src/index.html', dest: 'bundle' },
            ]
        }),
        typescript(),
        resolve(),
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
    ]
};