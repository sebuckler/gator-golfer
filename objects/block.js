export class Block {
    center = {x: 0, y: 0};
    normal = {x: 0, y: 0};

    constructor(game, pos, rot) {
        this.height = game.gridUnit / 2;
        this.image = document.getElementById("block");
        this.rotation = rot;
        this.size = game.gridUnit;
        this.width = game.gridUnit;

        this.setNormal();
        this.setPosition(pos[0], pos[1]);
    }

    setNormal() {
        switch (this.rotation) {
            case 0:
                this.normal = {x: 0, y: 1};
                break;
            case 45:
                this.normal = {x: 1, y: 1};
                break;
            case 90:
                this.normal = {x: 1, y: 0};
                break;
            case 135:
                this.normal = {x: -1, y: 1};
        }
    }

    draw(ctx) {
        const rotateX = this.position.x + this.width / 2;
        const rotateY = this.position.y + this.height / 2;

        ctx.translate(rotateX, rotateY);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.translate(-rotateX, -rotateY);
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    setPosition(x, y) {
        switch (this.rotation) {
            case 0:
            case 90:
                this.position = {x, y: y + this.height / 2};
                break;
            case 45:
            case 135:
                this.position = {x: x + this.height / 2, y: y - this.height / 2};
                break;
        }
        this.center = {x: this.position.x + this.width / 2, y: this.position.y + this.height / 2};
    }
}
