export class Hole {
    constructor(game, pos) {
        this.size = game.gridUnit * .75;
        this.image = document.getElementById("hole");
        this.position = {
            x: pos[0] + (game.gridUnit - this.size) / 2,
            y: pos[1] + (game.gridUnit - this.size) / 2,
        };
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
}
