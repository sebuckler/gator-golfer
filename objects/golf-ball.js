export class GolfBall {
    constructor(game, pos) {
        this.size = game.gridUnit * .5;
        this.image = document.getElementById("golfBall");
        this.position = {
            x: pos[0] + (this.size / 2),
            y: pos[1] + (this.size / 2),
        };
        this.speed = 0;
        this.vector = {x: 0, y: 0};
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    move(vel) {
        this.speed = vel.speed;
        this.vector.x = vel.x;
        this.vector.y = vel.y;
    }

    update() {
        this.position.x += this.vector.x * this.speed;
        this.position.y -= this.vector.y * this.speed;
    }
}
