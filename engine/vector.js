export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        let mag = Math.sqrt((this.x * this.x) + (this.y * this.y));

        if (mag <= Number.EPSILON && mag >= -Number.EPSILON) {
            mag = 0;
        }

        return mag;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
    }

    multiplyScalar(value) {
        this.x *= value;
        this.y *= value;
    }

    divideScalar(value) {
        if (Math.abs(value) === 0) {
            return;
        }

        this.x /= value;
        this.y /= value;
    }

    dot(vector) {
        return (this.x * vector.x) + (this.y * vector.y);
    }

    magnitudeDot(dot) {
        let mag = Math.sqrt((this.x * this.x) + (this.y * this.y) - (dot * dot));

        if (mag <= Number.EPSILON && mag >= -Number.EPSILON) {
            mag = 0;
        }

        return mag;
    }

    distance(vector) {
        return (this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y);
    }

    normal() {
        return new Vector(-this.y, this.x);
    }

    normalize() {
        if (this.magnitude <= Number.EPSILON && this.magnitude >= Number.EPSILON) {
            this.x = 0;
            this.y = 0;
        } else {
            this.divideScalar(this.magnitude);
        }
    }

    reflect(vector) {
        let normal = vector.normal();
        normal.normalize();
        normal.multiplyScalar(2 * this.dot(normal));

        this.subtract(normal);
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}
