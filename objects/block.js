export class Block {
    constructor(game, pos, slope) {
        this.width = game.gridUnit;
        this.height = game.gridUnit * .5;
        this.image = document.getElementById("block");
        this.initialPos = pos;
        this.position = {x: pos[0], y: pos[1]};
        this.vector = {x: slope[0], y: slope[1]};
    }

    draw(ctx) {
        if (this.vector.x === -1 && this.vector.y === 1) {
            this.position.x = this.initialPos[0] + this.width / 4;
            this.position.y = this.initialPos[1] + this.height * 1.5;
            this.setRotate(ctx, 45);
        }

        if (this.vector.x === 0 && this.vector.y === 1) {
            this.setRotate(ctx, 90);
        }

        if (this.vector.x === 1 && this.vector.y === 1) {
            this.position.x = this.initialPos[0] + this.width / 4;
            this.position.y = this.initialPos[1] + this.height * 1.5;
            this.setRotate(ctx, -45);
        }

        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    setRotate(ctx, deg) {
        const rotateX = this.position.x + this.width / 2;
        const rotateY = this.position.y + this.height / 2;
        ctx.translate(rotateX, rotateY);
        ctx.rotate(deg * Math.PI / 180);
        ctx.translate(-rotateX, -rotateY);
    }
}
