import {GameObjectClass, Vector} from "kontra";
import {centeredAnchor} from "../utils";

export class Entity extends GameObjectClass {
    movingTo: Vector = Vector(this.x, this.y);
    speed: number = 2;
    removeFlag: boolean = false;
    lookingDirection: number = 1;
    moving: boolean = false;
    anchor = centeredAnchor;

    update(){
        super.update();
        this.updateLookingDirection();
        this.updateMoving();
    }

    updateMoving(){
        const distance = Math.min(this.movingTo.distance(Vector(this.x, this.y)), this.currentSpeed());
        this.moving = distance != 0;

        if(distance < this.currentSpeed()){
            this.x = this.movingTo.x;
            this.y = this.movingTo.y;
        }else{
            const direction = this.vectorTo(this.movingTo.x, this.movingTo.y).normalize();
            this.x += direction.x * distance;
            this.y += direction.y * distance;
        }
    }

    updateLookingDirection(){
        if(this.getLookingDirection() == 0 || this.getLookingDirection() == this.lookingDirection) return;
        this.lookingDirection *= -1;
        this.scaleX *= -1;
    }

    distanceTo = (other: Entity): number => Vector(this.x, this.y).distance(Vector(other.x, other.y));
    vectorTo = (x: number, y: number): Vector => Vector(x - this.x, y - this.y)

    moveTo(direction: Vector, distance: number = 0){
        direction = direction.normalize();
        distance = distance == 0 ? this.currentSpeed() : distance;
        this.movingTo.x = this.x + direction.x * distance;
        this.movingTo.y = this.y + direction.y * distance;
    }

    getLookingDirection(): number{
        return Math.sign(this.movingTo.x - this.x);
    }

    currentSpeed = () => this.speed;
}