export class GolfBall {
    constructor(game, pos) {
        this.center = {x: pos[0] + game.gridUnit / 2, y: pos[1] + game.gridUnit / 2};
        this.image = document.getElementById("golfBall");
        this.position = {x: pos[0], y: pos[1]};
        this.size = game.gridUnit;
        this.speed = 0;
        this.vector = {x: 0, y: 0};
        this.width = game.gridUnit / 2;
    }

    draw(ctx) {
        const radius = this.width / 2;

        ctx.drawImage(this.image, this.position.x + radius, this.position.y + radius, this.width, this.width);
    }

    move(speed, vec) {
        this.speed = speed;
        this.vector.x = vec.x;
        this.vector.y = vec.y;
    }

    update() {
        this.position.x += this.vector.x * this.speed;
        this.position.y -= this.vector.y * this.speed;
        this.center.x = this.position.x + this.size / 2;
        this.center.y = this.position.y + this.size / 2;
    }
}
