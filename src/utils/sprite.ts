import {imageAssets, Sprite, SpriteSheet} from "kontra";
import {colorizeImage, PenColor} from "./colorize";

function getSpriteById(id: number, color: PenColor = PenColor.Green, additional: object = {}, asset = 'characters'): Sprite {
    return Sprite({
        anchor: centeredAnchor,
        ...additional,
        animations: SpriteSheet({
            frameHeight: 8,
            frameWidth: 8,
            image: colorizeImage(imageAssets[asset], color),
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
