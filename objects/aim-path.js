import {GameObject} from "../engine/object.js";
import {Rectangle} from "../engine/shape.js";
import {Vector} from "../engine/vector.js";

export class AimPath extends GameObject {
    constructor(x, y) {
        super(
            new Vector(x, y),
            new Rectangle(new Vector(0, 0), new Vector(64, 64)),
            new Vector(32, 32),
        );

        this.contactPoints = [];
        this.remainingLength = 128;
        this.velocity = new Vector(0, -1);
    }

    update(deltaTime) {
        if (this.remainingLength <= 0) {
            return;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#c00";
        ctx.strokeStyle = "#c00";
        ctx.lineWidth = 16;

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);

        this.contactPoints.forEach((point)=> {
            ctx.lineTo(point.x, point.y);
            ctx.moveTo(point.x, point.y);
        });

        ctx.lineTo(this.position.x, this.position.y);
        ctx.stroke();
    }

    move(velocity) {
        this.velocity = velocity;
    }
}
