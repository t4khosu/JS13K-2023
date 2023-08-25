export class Timer{
    maxTime!: number;
    time: number = 0;
    isActive: boolean = false;
    repeat: boolean = false;
    onEnd: () => void;

    constructor(maxTime: number, onEnd = () => {}, repeat: boolean = false) {
        this.setMax(maxTime);
        this.onEnd = onEnd;
        this.repeat = repeat;
    }

    setMax(max: number){
        this.maxTime = Math.floor(max);
    }

    update(){
        if(!this.isActive) return;
        this.time = (this.time + 1) % this.maxTime;

        if(this.time == 0){
            this.onEnd();
            this.isActive = this.repeat;
        }
    }

    start () {
        this.time = 0;
        this.isActive = true;
        return this;
    }
}