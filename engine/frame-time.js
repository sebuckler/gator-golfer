export class FrameTime {
    constructor(minFps, maxFps) {
        this.accumulated = 0;
        this.current = 0;
        this.delta = 1 / maxFps;
        this.elapsed = 0;
        this.minFps = minFps;
        this.previous = performance.now() / 1000;
    }

    upTick(timestamp) {
        this.current = timestamp / 1000;
        let frameDiff = this.current - this.previous;

        if (frameDiff > this.minFps) {
            frameDiff = this.minFps;
        }

        this.previous = this.current;
        this.accumulated += frameDiff;
    }

    downTick() {
        this.accumulated -= this.delta;
        this.elapsed += this.delta;
    }

    shouldDownTick() {
        return this.accumulated > this.delta;
    }
}
