import {GameObjectClass, imageAssets, randInt, TileEngine} from "kontra";
import {weightedRandNumber} from "../utils/rand-util";


export default class Room extends GameObjectClass {

    constructor() {
        super()

        const canvasWidth = 800
        const canvasHeight = 400

        const xDim = Math.ceil(canvasWidth / 16)
        const yDim = Math.ceil(canvasHeight / 16)


        const map = new Map<number, number>()
        map.set(1, 37)
        map.set(2, 7)
        map.set(3, 7)
        map.set(4, 7)
        map.set(5, 1)
        map.set(6, 1)
        map.set(7, 1)

        const randomData: number[] = []
        for (let i = 0; i < xDim * yDim; i++) {
            const rand = weightedRandNumber(map)
            randomData.push(rand ? rand : 1)
        }
        this.tileEngine = TileEngine({
            // tile size
            tilewidth: 16,
            tileheight: 16,

            // map size in tiles
            width: xDim,
            height: yDim,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: imageAssets['tiles']
            }],

            // layer object
            layers: [{
                name: 'ground',
                data: randomData
            }]
        });
    }

    render() {
        this.tileEngine.render();
    }

}
