export function detectBallHitWall(ball, game) {
    if (ball.position.x + ball.width >= game.width || ball.position.x <= 0) {
        return [true, 90];
    }

    if (ball.position.y + ball.width >= game.height || ball.position.y <= 0) {
        return [true, 0];
    }

    return [false, null];
}

export function detectBallInHole(ball, hole) {
    const bRad = ball.size / 2;

    return ball.position.x + bRad >= hole.position.x && ball.position.x + bRad <= hole.position.x + hole.size
        && ball.position.y + bRad <= hole.position.y + hole.size && ball.position.y + bRad >= hole.position.y;
}

export function detectBallHitTile(ball, tile) {
    const distX = Math.abs(ball.center.x - tile.center.x);
    const distY = Math.abs(ball.center.y - tile.center.y);

    return isBallMovingToObject(ball, tile) && Math.sqrt(distX * distX + distY * distY) <= ball.size;
}

export function detectBallHitBlock(ball, block) {
    if (ball.speed === 0 || !isBallMovingToObject(ball, block)) {
        return false;
    }

    const vm = ball.vector.y / ball.vector.x;
    const nm = block.normal.y / block.normal.x;

    if ((!isFinite(vm) && !isFinite(nm)) || vm === nm) {
        return detectHeadOn(ball, block);
    }

    return detectCorner(ball, block);
}

export function reflectVector(vec, rot) {
    if (vec.x === 0 && (vec.y > 0 || vec.y < 0)) {
        return reflectVertical(vec, rot);
    }

    if ((vec.x > 0 || vec.x < 0) && vec.y === 0) {
        return reflectHorizontal(vec, rot);
    }

    if (vec.x !== 0 && vec.y !== 0) {
        return reflectDiagonal(vec, rot);
    }

    return vec;
}

function detectHeadOn(ball, block) {
    return Math.abs(ball.center.x - block.center.x) <= ball.width / 2 + block.height / 2
        && Math.abs(ball.center.y - block.center.y) <= ball.width / 2 + block.height / 2;
}

function detectCorner(ball, block) {
    const offset = block.size / 4;

    if (((ball.vector.x === 0 && ball.vector.y > 0 || ball.vector.y < 0))
        || ((ball.vector.x > 0 || ball.vector.x < 0) && ball.vector.y === 0)) {
        return ball.center.x >= block.position.x && ball.center.x <= block.position.x + block.size
            && ball.center.y >= block.position.y - offset && ball.center.y <= block.position.y - offset + block.size;
    }

    if (ball.vector.x !== 0 && ball.vector.y !== 0) {
        return Math.abs(ball.center.x - block.center.x) <= ball.width / 2 + block.height / 2
            && Math.abs(ball.center.y - block.center.y) <= ball.width / 2 + block.height / 2;
    }
}

function reflectVertical(vec, rot) {
    switch (rot) {
        case 0:
        case 90:
            return {x: vec.x, y: -vec.y};
        case 45:
            return {x: -vec.y, y: vec.x};
        case 135:
            return {x: vec.y, y: vec.x};
    }
}

function reflectHorizontal(vec, rot) {
    switch (rot) {
        case 0:
        case 90:
            return {x: -vec.x, y: vec.y};
        case 45:
        case 135:
            return {x: vec.y, y: vec.x};
    }
}

function reflectDiagonal(vec, rot) {
    switch (rot) {
        case 0:
            return {x: vec.x, y: -vec.y};
        case 45:
        case 135:
            return {x: -vec.x, y: -vec.y};
        case 90:
            return {x: -vec.x, y: vec.y};
    }
}

function isBallMovingToObject(ball, obj) {
    if (ball.vector.x === 0 && ball.vector.y > 0) {
        return ball.center.y >= obj.center.y;
    }

    if (ball.vector.x === 0 && ball.vector.y < 0) {
        return ball.center.y <= obj.center.y;
    }

    if (ball.vector.x < 0 && ball.vector.y === 0) {
        return ball.center.x >= obj.center.x;
    }

    if (ball.vector.x > 0 && ball.vector.y === 0) {
        return ball.center.x <= obj.center.x;
    }

    if (ball.vector.x < 0 && ball.vector.y > 0) {
        return ball.center.x >= obj.center.x || ball.center.y >= obj.center.y;
    }

    if (ball.vector.x > 0 && ball.vector.y > 0) {
        return ball.center.y >= obj.center.y || ball.center.x <= obj.center.x;
    }

    if (ball.vector.x < 0 && ball.vector.y < 0) {
        return ball.center.y <= obj.center.y || ball.center.x >= obj.center.x;
    }

    if (ball.vector.x > 0 && ball.vector.y < 0) {
        return ball.center.y <= obj.center.y || ball.center.x <= obj.center.x;
    }

    return false;
}
