import {keyPressed, SpriteClass} from "kontra";

export class Player extends SpriteClass {
    width = 2
    height = 2
    z = 3
    maxHealth = 10

    health = 0

    update() {
        this.time++
        if (keyPressed('arrowleft') && this.x > 5) this.x--
        if (keyPressed('arrowright') && this.x + this.width < 345) this.x++
        if (keyPressed('arrowup') && this.y > 5) this.y--
        if (keyPressed('arrowdown') && this.y + this.height < 395) this.y++
        this.color = '#695535ee'
    }

    render() {
        let ctx = this.context
        ctx.fillStyle = this.color
        ctx.fillRect(this.x - 4, this.y - 4, 10, 10)

        ctx.fillStyle = '#99c3a0'
        ctx.fillRect(this.x, this.y, 2, 2)
    }

    /**
     * Reset initial player state
     */
    reset() {
        this.invincibleTime = 0
        this.health = this.maxHealth
    }

    /**
     * Call on enemy or bullet collision
     */
    hit() {
        //TODO
    }
}