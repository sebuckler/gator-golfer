import {GameObject} from "../engine/object.js";
import {Rectangle} from "../engine/shape.js";
import {Vector} from "../engine/vector.js";

export class TeePad extends GameObject {
    constructor(x, y) {
        super(
            new Vector(x, y),
            new Rectangle(new Vector(0, 0), new Vector(64, 64)),
            null,
        );

        this.image = document.getElementById("teePad");
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.boundingBox.width,
            this.boundingBox.height,
        );
    }
}
