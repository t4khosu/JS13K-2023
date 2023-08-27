import {GameObjectClass, getCanvas, getWorldRect, imageAssets, randInt, TileEngine, TileEngineClass} from "kontra";
import {weightedRandNumber} from "../utils/rand-util";

interface TileLayer {
    opacity: number
    data: number[]
    scale: number
}


interface TileSet {
    firstgid: number
    margin: number
    image: any
    columns: number
}

/**
 * Get the row from the y coordinate.
 * @private
 *
 * @param {Number} y - Y coordinate.
 * @param {Number} tileheight - Height of a single tile (in pixels).
 *
 * @return {Number}
 */
function getRow(y: number, tileheight: number) {
    return (y / tileheight) | 0;
}

/**
 * Get the col from the x coordinate.
 * @private
 *
 * @param {Number} x - X coordinate.
 * @param {Number} tilewidth - Width of a single tile (in pixels).
 *
 * @return {Number}
 */
function getCol(x: number, tilewidth: number) {
    return (x / tilewidth) | 0;
}


class CustomTileEngine extends TileEngineClass {
    // @ts-ignore kontra default
    layerMap: Record<string, TileLayer>

    layerCollidesWith(name: string, object: any) {
        let {tilewidth, tileheight, layerMap} = this;
        let {x, y, width, height} = getWorldRect(object);
        let layer = layerMap[name];

        let row = getRow(y, tileheight * layer.scale);
        let col = getCol(x, tilewidth * layer.scale);
        let endRow = getRow(y + height, tileheight * layer.scale);
        let endCol = getCol(x + width, tilewidth * layer.scale);


        // check all tiles
        for (let r = row; r <= endRow; r++) {
            for (let c = col; c <= endCol; c++) {
                if (layer.data[c + r * this.width]) {
                    return true;
                }
            }
        }

        return false;
    }

    _r(layer: TileLayer, context: CanvasRenderingContext2D) {
        let {opacity, data = [], scale = 1} = layer;
        let {tilesets, width, tilewidth, tileheight} = this;

        context.save();
        context.globalAlpha = opacity;
        context.imageSmoothingEnabled = false;
        context.scale(scale, scale)

        data.map((tile, index) => {
            // skip empty tiles (0)
            if (!tile) return;

            // find the tileset the tile belongs to
            // assume tilesets are ordered by firstgid
            let tileset: TileSet
            for (let i = tilesets.length - 1; i >= 0; i--) {
                tileset = tilesets[i] as TileSet;

                if (tile / tileset.firstgid >= 1) {
                    break;
                }
            }

            // @ts-ignore
            let {image, margin = 0, firstgid, columns} = tileset;
            let offset = tile - firstgid;
            let cols = columns ?? (image.width / (tilewidth + margin)) | 0;
            let scaleOffset = scale

            let x = (index % width) * tilewidth;
            let y = ((index / width) | 0) * tileheight;
            let sx = (offset % cols) * (tilewidth + margin);
            let sy = ((offset / cols) | 0) * (tileheight + margin);

            context.drawImage(
                image,
                sx,
                sy,
                tilewidth,
                tileheight,
                x,
                y,
                tilewidth,
                tileheight
            );
        });

        context.restore();
    }
}

export default class Room extends GameObjectClass {

    tileEngine

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

        const wallScale = 2
        // TODO something in the kontra tile engine breaks when both values are multiplied resulting in wrong coordinates
        const xDimScale = Math.ceil(canvasWidth / (16 * wallScale))
        const yDimScale = Math.ceil(canvasHeight / (16))
        const wallData: number[][] = []
        for (let j = 0; j < yDimScale; j++) {
            wallData[j] = []
            for (let i = 0; i < xDimScale; i++) {
                if (i === 0 || j === 0 || i === xDimScale - 1 || j === yDimScale - 1) {
                    wallData[j].push(9)
                } else {
                    wallData[j].push(0)
                }
            }
        }
        console.log(wallData)
        // this.tileEngine = TileEngine({
        this.tileEngine = new CustomTileEngine({
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
            }, {
                name: 'walls',
                data: wallData.flat(),
                scale: wallScale
            }
            ]
        });
    }

    render() {
        this.tileEngine.render();
    }

}
