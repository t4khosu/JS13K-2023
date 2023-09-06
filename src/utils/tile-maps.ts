import {getCanvas, imageAssets, TileEngine} from "kontra";
import {weightedRandNumber} from "./rand-util";


export function getBackGroundTileMap(xTiles: number, yTiles: number) {
    const map = new Map<number, number>()
    // map.set(1, 37)
    // map.set(2, 7)
    // map.set(3, 7)
    // map.set(4, 7)
    // map.set(5, 1)
    // map.set(6, 1)
    // map.set(7, 1)

    const randomData: number[] = []
    for (let i = 0; i < xTiles * yTiles; i++) {
        // const rand = weightedRandNumber(map)
        // randomData.push(rand ? rand : 1)
        randomData.push(1)
    }

    return randomData
}

export function getWallTileMap() {
    let {width, height} = getCanvas();
    const wallScale = 2
    // TODO something in the kontra tile engine breaks when both values are multiplied resulting in wrong coordinates
    const xDimScale = Math.ceil(width / (8))
    const yDimScale = Math.ceil(height / (8))
    const wallData: number[][] = []
    for (let j = 0; j < yDimScale; j++) {
        wallData[j] = []
        for (let i = 0; i < xDimScale; i++) {
            if (i === 0 || j === 0 || i === xDimScale - 1 || j === yDimScale - 1) {
                wallData[j].push(2)
            } else {
                wallData[j].push(0)
            }
        }
    }
    return wallData
}