import {init, GameLoop, initKeys, load, GameObject, Sprite, keyPressed, GameObjectClass} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger, Staff} from "./entities/weapon";
import {Mage, Villager} from "./entities/enemies";
import {cleanSpells, getSpells} from "./utils/utils";
import {initMouse} from "./utils/mouse";
import {collidesWithRotation, CollRect} from "./utils/collision";

let { canvas} = init();

initKeys()
initMouse(canvas);

class Rect extends GameObjectClass {
    sprite: Sprite;
    constructor(x: number, y: number, width: number, height: number, color: string, anchor: {x: number, y: number}) {
        super({width: width, height: height, x: x, y: y, rotation: 0, anchor: anchor});
        this.sprite = Sprite({height: height, width: width, color: color, anchor: anchor})
        this.addChild(this.sprite)
    }

    setColor(color: string){
        this.sprite.color = color;
    }
}
class ControlRect extends Rect{
    constructor(x: number, y: number, width: number, height: number, color: string, anchor: {x: number, y: number}) {
        super(x, y, width, height, color, anchor);
    }

    update(){
        super.update();
        if(keyPressed("arrowleft")) this.x -= 2;
        if(keyPressed("arrowright")) this.x += 2;
        if(keyPressed("arrowup")) this.y -= 2;
        if(keyPressed("arrowdown")) this.y += 2;
        if(keyPressed("q")) this.rotation += 0.03;
        if(keyPressed("e")) this.rotation -= 0.03;
    }
}


load(
    'characters.png',
).then(function () {
    const player = new Player()
    const weapon = new BigDagger();
    player.handWeapon(weapon);

    const villager = new Villager(250, 150);
    villager.handWeapon(new SmallDagger())
    villager.player = player;

    const mage = new Mage(500, 300);
    mage.handWeapon(new Staff())
    mage.player = player;

    player.dummyTargets = [mage, villager]

    const obj2 = new ControlRect(290, 100, 100, 50, "purple", {x: 0.5, y: 0.5});
    obj2.setScale(-1.5, -1.5)

    GameLoop({
        update: () => {

            obj2.update();
            if(collidesWithRotation(obj2, weapon)){
                obj2.setColor("red")
            }else{
                obj2.setColor("purple")
            }

            !villager.removeFlag && villager.update()
            !mage.removeFlag && mage.update();
            !player.removeFlag && player.update()
            cleanSpells();
            getSpells().forEach(s => s.update())
        },
        render: () => {
            obj2.render();
            !villager.removeFlag && villager.render()
            !mage.removeFlag && mage.render();
            !player.removeFlag && player.render()
            getSpells().forEach(s => s.render())
        }
    }).start()
});
