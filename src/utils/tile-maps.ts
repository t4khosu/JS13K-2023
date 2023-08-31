import {getCanvas, imageAssets, TileEngine} from "kontra";
import {weightedRandNumber} from "./rand-util";


export function getBackGroundTileMap() {
    let {width, height} = getCanvas();
    const xDim = Math.ceil(width / 16)
    const yDim = Math.ceil(height / 16)

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

    return randomData
}

export function getWallTileMap() {
    let {width, height} = getCanvas();
    const wallScale = 2
    // TODO something in the kontra tile engine breaks when both values are multiplied resulting in wrong coordinates
    const xDimScale = Math.ceil(width / (16))
    const yDimScale = Math.ceil(height / (16))
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
    return wallData
}