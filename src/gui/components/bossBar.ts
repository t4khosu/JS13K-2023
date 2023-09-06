import {GameObjectClass, Sprite, Text} from "kontra";
import {Enemy} from "../../entities/enemies/enemy";
import {centeredAnchor} from "../../utils/sprite";
class BossBar extends GameObjectClass{
    healthBar: Sprite;
    healthBarWidth: number = 200;
    text: Text;
    constructor(boss?: Enemy) {
        super({boss: boss, x: 390, y: 16});
        this.healthBar = Sprite({anchor: centeredAnchor, y: 14, height: 4, color: "#ff000099"})
        this.text = Text({text: boss?.name ?? "", font: '16px Verdana', textAlign: 'right', anchor: centeredAnchor})
        this.addChild(this.healthBar, this.text)
    }

    update(){
        super.update()
        if(this.boss !== undefined) this.healthBar.width = (this.boss.health / this.boss.maxHealth) * this.healthBarWidth;
    }

    render(){
        if(this.boss !== undefined) super.render();
    }
}

export default BossBar;