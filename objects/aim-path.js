export class AimPath {
    constructor(game, pos) {
        this.center = {x: pos[0] + game.gridUnit / 2, y: pos[1] + game.gridUnit / 2};
        this.changePoints = [];
        this.length = game.gridUnit * 2;
        this.position = {x: pos[0], y: pos[1]};
        this.size = game.gridUnit;
        this.speed = 6;
        this.startPoint = {x: pos[0], y: pos[1]};
        this.vector = {x: 0, y: 1};
        this.width = game.gridUnit / 4;
    }

    draw(ctx) {
        let drawVec = this.vector;
        ctx.fillStyle = "#c00";
        ctx.strokeStyle = "#c00";
        ctx.lineWidth = this.width * 2;
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x + this.getOffsetX(drawVec.x), this.startPoint.y + this.getOffsetY(drawVec.y));
        this.changePoints.forEach(p => {
            drawVec = p.vec;

            ctx.lineTo(p.x, p.y);
            ctx.moveTo(p.x, p.y + this.getOffsetY(drawVec.y));
        });
        const endOffsetY = drawVec.x === 0 || this.changePoints.length === 0 ? 0 : this.getOffsetY(drawVec.y);
        ctx.lineTo(this.center.x, this.center.y + endOffsetY);
        ctx.stroke();
    }

    getOffsetX(x) {
        return this.size / 2 + x * this.width;
    }

    getOffsetY(y) {
        return y * this.width;
    }

    move(vec) {
        this.changePoints.push({x: this.center.x, y: this.center.y, vec: {x: vec.x, y: vec.y}});
    }

    setVector(vec) {
        this.changePoints = [];
        this.vector.x = vec.x;
        this.vector.y = vec.y;
        this.length = this.size * 2 - 16;
        this.position.x = this.startPoint.x;
        this.position.y = this.startPoint.y;
    }

    update() {
        if (this.length <= 0) {
            return;
        }

        const vec = this.changePoints.length > 0 ? this.changePoints[this.changePoints.length - 1].vec : this.vector;
        this.position.x += vec.x * this.speed;
        this.position.y -= vec.y * this.speed;
        this.length -= this.speed;
        this.center.x = this.position.x + this.size / 2;
        this.center.y = this.position.y + this.size / 2;
    }
}
