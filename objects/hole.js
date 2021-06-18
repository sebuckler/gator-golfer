import {GameObject} from "../engine/object.js";
import {Circle, Rectangle} from "../engine/shape.js";
import {Vector} from "../engine/vector.js";

export class Hole extends GameObject {
    constructor(x, y) {
        super(
            new Vector(x, y),
            new Rectangle(new Vector(0, 0), new Vector(48, 48)),
            new Circle(new Vector(24, 24), 24),
        );

        this.image = document.getElementById("hole");
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x + 8,
            this.position.y + 8,
            this.boundingBox.width,
            this.boundingBox.height,
        );
    }
}
