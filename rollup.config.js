import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import kontra from 'rollup-plugin-kontra';
import clear from 'rollup-plugin-clear';
import execute from "rollup-plugin-shell";
import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";

export default {
    input: './src/main.ts',
    output: {
        dir: 'bundle',
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
                velocity: true,
            },
            debug: false
        }),
    ]
};