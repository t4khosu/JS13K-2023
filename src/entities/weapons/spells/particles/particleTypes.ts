class ParticleType{
    color: string
    speed: number
    damage: number
    lifetime: number
    constructor(color: string, speed: number, damage: number, lifetime: number) {
        this.color = color;
        this.speed = speed;
        this.damage = damage;
        this.lifetime = lifetime;
    }
}

const holyParticleType = new ParticleType("#ffffcc", 1.2, 2, 100);
const iceParticleType = new ParticleType("#b5dedd", 0.4, 4, 50);

export {ParticleType, holyParticleType, iceParticleType}