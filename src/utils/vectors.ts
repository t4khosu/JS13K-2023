import {GameObject, Vector} from "kontra";

const getRotatedVector = (v: Vector, radiant: number) => Vector(
    Math.cos(radiant)*v.x - Math.sin(radiant)*v.y,
    Math.sin(radiant)*v.x + Math.cos(radiant)*v.y
)

const getVectorBetweenGameObjects = (source: GameObject, destination: GameObject) => Vector(
    destination.world.x - source.world.x,
    destination.world.y - source.world.y
)

export {getRotatedVector, getVectorBetweenGameObjects}