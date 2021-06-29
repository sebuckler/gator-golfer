import {GameObject} from "../engine/object.js";
import {Circle, Rectangle} from "../engine/shape.js";
import {Vector} from "../engine/vector.js";

export class AimPath extends GameObject {
    constructor(x, y) {
        super(
            new Vector(x + 16, y + 16),
            new Rectangle(new Vector(0, 0), new Vector(32, 32)),
            new Circle(new Vector(16, 16), 16),
        );

        this.initialPosition = new Vector(x + 16, y + 16);
        this.startPoint = this.center;
        this.contactPoints = [];
        this.remainingLength = 256;
        this.velocity = new Vector(0, 0);
        this.aimDirection = new Vector(0, 0);
        this.collisionImage = document.getElementById("golfBall");
        this.collisionImage.style.opacity = 0.5;
    }

    get center() {
        return this.collider.absolute(this.position).center;
    }

    update(deltaTime) {
        if (this.remainingLength <= 0) {
            return;
        }

        let deltaVelocity = this.velocity.copy();
        deltaVelocity.multiplyScalar(deltaTime);

        this.position.add(deltaVelocity);
        this.remainingLength -= deltaVelocity.magnitude;
    }

    draw(ctx) {
        ctx.fillStyle = "#c00";
        ctx.strokeStyle = "#c00";
        ctx.lineWidth = 8;

        ctx.beginPath();
        ctx.moveTo(this.startPoint.x, this.startPoint.y);

        let ballPoints = [];
        this.contactPoints.forEach((point) => {
            ctx.lineTo(point.x, point.y);
            ctx.moveTo(point.x, point.y);
            ballPoints.push({x: point.x, y: point.y});
        });

        ctx.lineTo(this.center.x, this.center.y);
        ctx.stroke();

        ctx.globalAlpha = 0.5;
        ballPoints.forEach((point) => {
            ctx.drawImage(this.collisionImage, point.x - 16, point.y - 16);
        });
        ctx.globalAlpha = 1;
    }

    addContact() {
        this.contactPoints.push(this.center);
    }

    move(velocity) {
        this.contactPoints = [];
        this.position = this.initialPosition.copy();
        this.remainingLength = 256;
        this.velocity = velocity.copy();
        this.aimDirection = velocity.copy();
    }
}
