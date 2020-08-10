export function detectBallHitWall(ball, game) {
    if (ball.position.x + ball.size >= game.width || ball.position.x <= 0) {
        return [true, {x: 0, y: 1}];
    }

    if (ball.position.y + ball.size >= game.height || ball.position.y <= 0) {
        return [true, {x: 1, y: 0}];
    }

    return [false, null];
}

export function detectBallInHole(ball, hole) {
    const ballRadius = ball.size / 2;
    const ballEdgeX = ball.position.x + ballRadius;
    const ballEdgeY = ball.position.y + ballRadius;

    return ballEdgeX >= hole.position.x && ballEdgeX <= hole.position.x + hole.size
        && ballEdgeY <= hole.position.y + hole.size && ballEdgeY >= hole.position.y;
}

export function detectBallHitBlock(ball, block) {
    return isBallMovingToBlock(ball, block)
        && ball.position.x + ball.size >= block.position.x && ball.position.x <= block.position.x + block.width
        && ball.position.y <= block.position.y + block.height && ball.position.y + ball.size >= block.position.y;
}

export function reflectVector(v1, v2) {
    const nx = -v2.y;
    const ny = v2.x;

    if (v1.x / v1.y === nx / ny) {
        return {x: -v1.x, y: -v1.y};
    }

    return {x: -v1.y, y: v1.x};
}

function isBallMovingToBlock(ball, block) {
    return ball.vector.x > 0 && block.position.x > ball.position.x
        || ball.vector.x < 0 && block.position.x < ball.position.x
        || ball.vector.y > 0 && block.position.y < ball.position.y
        || ball.vector.y < 0 && block.position.y > ball.position.y;
}
