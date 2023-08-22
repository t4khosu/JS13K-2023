import {GameObjectClass, imageAssets, randInt, TileEngine} from "kontra";


export default class Room extends GameObjectClass {

    constructor() {
        super()

        const canvasWidth = 800
        const canvasHeight = 400

        const xDim = Math.ceil(canvasWidth / 32)
        const yDim = Math.ceil(canvasHeight / 32)
        console.log(xDim)
        console.log(yDim)
        const randomData: number[] = []
        for (let i = 0; i < xDim * yDim; i++) {
            randomData.push(randInt(1, 62))
        }
        console.log(randomData)
        this.tileEngine = TileEngine({
            // tile size
            tilewidth: 32,
            tileheight: 32,

            // map size in tiles
            width: xDim,
            height: yDim,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: imageAssets['grass']
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
