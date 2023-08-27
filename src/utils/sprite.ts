import {imageAssets, Sprite, SpriteSheet} from "kontra";

function getSpriteById(id: number, additional: object = {}): Sprite {
    return Sprite({
        anchor: centeredAnchor,
        ...additional,
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

const centeredAnchor = {x: 0.5, y: 0.5}

export {getSpriteById, centeredAnchor};
