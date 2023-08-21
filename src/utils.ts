import {imageAssets, Sprite, SpriteSheet} from "kontra";

function getSpriteById(id: number): Sprite {
    return Sprite({
        anchor: {x: 0.5, y: 0.5},
        animations: SpriteSheet({
            frameHeight: 8,
            frameWidth: 8,
            image: imageAssets['characters'],
            animations: {
                i: {
                    frames: id
                }
            }
        }).animations
    });
}

export {getSpriteById}