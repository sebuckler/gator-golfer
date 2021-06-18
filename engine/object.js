import {aabbAabb, aabbWall, circleAabb, circleCircle, circleTriangle, circleWall, pointAabb} from "./collisions.js";

export class GameObject {
    constructor(position, boundingBox, collider) {
        this.position = position;
        this.boundingBox = boundingBox;
        this.collider = collider;
    }

    collideWall(wall, collisions) {
        if (this.collider.type === "circle") {
            circleWall(this.collider.absolute(this.position), wall, collisions);
        } else {
            aabbWall(this.boundingBox.absolute(this.position), wall, collisions);
        }
    }

    collideNarrowPhase(object) {
        return aabbAabb(this.boundingBox.absolute(this.position), object.boundingBox.absolute(object.position));
    }

    collideObject(object, collisions) {
        switch (this.collider.type) {
            case "rectangle":
                return this.handleRectangle(object, collisions);
            case "point":
                return this.handlePoint(object, collisions);
            case "circle":
                return this.handleCircle(object, collisions);
            case "triangle":
                return this.handleTriangle(object, collisions);
            default:
                return false;
        }
    }

    handleRectangle(object, collisions) {
        let absoluteCollider1 = this.collider.absolute(this.position);
        let absoluteCollider2 = object.collider.absolute(object.position);

        switch (object.collider.type) {
            case "rectangle":
                return aabbAabb(absoluteCollider1, absoluteCollider2);
            case "point":
                let absolutePoint = object.collider.copy();
                absolutePoint.add(object.position);

                return pointAabb(absoluteCollider1, absolutePoint);
            case "circle":
                return circleAabb(absoluteCollider2, absoluteCollider1, collisions);
            default:
                return false;
        }
    }

    handlePoint(object, collisions) {
        if (object.collider.type === "rectangle") {
            let absolutePoint = this.collider.copy();
            absolutePoint.add(this.position);

            return pointAabb(absolutePoint, object.collider.absolute(object.position));
        }

        return false;
    }

    handleCircle(object, collisions) {
        let absoluteCollider1 = this.collider.absolute(this.position);
        let absoluteCollider2 = object.collider.absolute(object.position);

        switch (object.collider.type) {
            case "rectangle":
                return circleAabb(absoluteCollider1, absoluteCollider2, collisions);
            case "circle":
                return circleCircle(absoluteCollider1, absoluteCollider2, collisions);
            case "triangle":
                return circleTriangle(absoluteCollider1, absoluteCollider2, collisions);
            default:
                return false;
        }
    }

    handleTriangle(object, collisions) {
        if (object.collider.type === "circle") {
            return circleTriangle(
                object.collider.absolute(object.position),
                this.collider.absolute(this.position),
                collisions,
            );
        }

        return false;
    }
}
