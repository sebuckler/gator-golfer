import {GameObject} from "../engine/object.js";
import {Rectangle} from "../engine/shape.js";
import {Vector} from "../engine/vector.js";

export class Block extends GameObject {
    constructor(x, y, collider, imageId) {
        super(
            new Vector(x, y),
            new Rectangle(new Vector(0, 0), new Vector(64, 64)),
            collider,
        );

        this.image = document.getElementById(imageId);
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}
