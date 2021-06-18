import {Vector} from "./vector.js";

export function aabbWall(rectangle, wall, collisions) {
    return rectangle.topLeft.y < 0
        || rectangle.topLeft.y + rectangle.height > wall.height
        || rectangle.topLeft.x < 0
        || rectangle.topLeft.x + rectangle.width > wall.width;
}

export function aabbAabb(rect1, rect2) {
    return rect1.topLeft.x < rect2.bottomRight.x
        && rect1.bottomRight.x > rect2.topLeft.x
        && rect1.bottomRight.y > rect2.topLeft.y
        && rect1.topLeft.y < rect2.bottomRight.y;
}

export function pointAabb(point, rectangle) {
    return point.x >= rectangle.topLeft.x
        && point.y >= rectangle.topLeft.y
        && point.x <= rectangle.bottomRight.x
        && point.y <= rectangle.bottomRight.y;
}

export function pointCircle(point, circle, collisions) {
    let pointVector = point.copy();
    pointVector.subtract(circle.center);

    if (pointVector.magnitude <= circle.radius) {
        collisions.push(pointVector);

        return true;
    }
}

export function circleWall(circle, wall, collisions) {
    if (circle.center.y - circle.radius < 0) {
        collisions.push(new Vector(1, 0));
    }

    if (circle.center.y + circle.radius > wall.height) {
        collisions.push(new Vector(-1, 0));
    }

    if (circle.center.x - circle.radius < 0) {
        collisions.push(new Vector(0, -1));
    }

    if (circle.center.x + circle.radius > wall.width) {
        collisions.push(new Vector(0, 1));
    }
}

export function circleAabb(circle, rectangle, collisions) {
    let nearestVector = rectangle.bottomRight.copy();

    if (circle.center.x < nearestVector.x) {
        nearestVector.x = circle.center.x;
    }
    if (rectangle.topLeft.x > nearestVector.x) {
        nearestVector.x = rectangle.topLeft.x;
    }

    if (circle.center.y < nearestVector.y) {
        nearestVector.y = circle.center.y;
    }
    if (rectangle.topLeft.y > nearestVector.y) {
        nearestVector.y = rectangle.topLeft.y;
    }

    let instanceVector = nearestVector.copy();
    instanceVector.subtract(circle.center);

    if (instanceVector.magnitude < circle.radius) {
        collisions.push(instanceVector.normal());

        return true;
    }
}

export function circleCircle(circ1, circ2, collisions) {
    let combinedRadius = circ1.radius + circ2.radius;

    if (circ1.center.distance(circ2.center) < combinedRadius * combinedRadius) {
        let instanceVector = circ2.center.copy();
        instanceVector.subtract(circ1.center);

        collisions.push(instanceVector.normal());

        return true;
    }
}

export function circleLineSegment(circle, point1, point2, collisions) {
    let circleCenter = circle.center.copy();
    let segment = point1.copy();

    circleCenter.subtract(point2);
    segment.subtract(point2);

    let dotProduct = circleCenter.dot(segment);
    if (dotProduct > 0) {
        let edgeMagnitude = segment.magnitude;
        dotProduct = dotProduct / edgeMagnitude;

        if (dotProduct < edgeMagnitude && circleCenter.magnitudeDot(dotProduct) <= circle.radius) {
            segment.multiplyScalar(-1);
            collisions.push(segment);

            return true;
        }
    }
}

export function circleTriangle(circle, triangle, collisions) {
    return pointCircle(triangle.point1, circle, collisions)
        || pointCircle(triangle.point2, circle, collisions)
        || pointCircle(triangle.point3, circle, collisions)
        || circleLineSegment(circle, triangle.point2, triangle.point1, collisions)
        || circleLineSegment(circle, triangle.point3, triangle.point2, collisions)
        || circleLineSegment(circle, triangle.point1, triangle.point3, collisions);
}
