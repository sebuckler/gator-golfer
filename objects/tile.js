export class Tile {
    constructor(game, pos) {
        this.image = document.getElementById("tile");
        this.position = {x: pos[0], y: pos[1]};
        this.size = game.gridUnit;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
}
