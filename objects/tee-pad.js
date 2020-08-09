export class TeePad {
    constructor(game, pos) {
        this.size = game.gridUnit;
        this.image = document.getElementById("teePad");
        this.position = {
            x: pos[0],
            y: pos[1],
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
}
