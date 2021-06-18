export class Shape {
    constructor(type) {
        this.type = type;
    }
}

export class Rectangle extends Shape {
    constructor(topLeft, bottomRight) {
        super("rectangle");

        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    get height() {
        return this.bottomRight.y - this.topLeft.y;
    }

    get width() {
        return this.bottomRight.x - this.topLeft.x;
    }

    absolute(position) {
        let absoluteTopLeft = this.topLeft.copy();
        let absoluteBottomRight = this.bottomRight.copy();

        absoluteTopLeft.add(position);
        absoluteBottomRight.add(position);

        return new Rectangle(absoluteTopLeft, absoluteBottomRight)
    }
}

export class Circle extends Shape {
    constructor(center, radius) {
        super("circle");

        this.center = center;
        this.radius = radius;
    }

    absolute(position) {
        let absoluteCenter = this.center.copy();
        absoluteCenter.add(position);

        return new Circle(absoluteCenter, this.radius);
    }
}

export class Triangle extends Shape {
    constructor(point1, point2, point3) {
        super("triangle");

        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
    }

    absolute(position) {
        let absolutePoint1 = this.point1.copy();
        let absolutePoint2 = this.point2.copy();
        let absolutePoint3 = this.point3.copy();

        absolutePoint1.add(position);
        absolutePoint2.add(position);
        absolutePoint3.add(position);

        return new Triangle(absolutePoint1, absolutePoint2, absolutePoint3);
    }
}
