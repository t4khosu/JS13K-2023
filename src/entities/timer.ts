export class Timer{
    maxTime: number;
    time: number = 0;
    running: boolean = false;

    constructor(maxTime: number) {
        this.maxTime = maxTime;
    }

    update(){
        if(!this.running) return;
        this.time = Math.min(this.maxTime, this.time + 1)
        this.running = this.time != 0 && this.time < this.maxTime;
    }

    restart () {
        this.time = 0;
        this.running = true;
    }
}