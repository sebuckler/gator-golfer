import {GameObject} from "../engine/object.js";
import {Circle, Rectangle} from "../engine/shape.js";
import {Vector} from "../engine/vector.js";

export class GolfBall extends GameObject {
    constructor(x, y) {
        super(
            new Vector(x + 16, y + 16),
            new Rectangle(new Vector(0, 0), new Vector(32, 32)),
            new Circle(new Vector(16, 16), 16),
        );

        this.image = document.getElementById("golfBall");
        this.velocity = new Vector(0, 0);
    }

    update(deltaTime) {
        let deltaVelocity = this.velocity.copy();
        deltaVelocity.multiplyScalar(deltaTime);

        this.position.add(deltaVelocity);
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

    move(velocity) {
        this.velocity = velocity;
    }

    stop() {
        this.velocity = new Vector(0, 0);
    }
}
