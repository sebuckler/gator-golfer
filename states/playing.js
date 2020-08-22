import {
    detectObjHitBlock,
    detectBallHitTile,
    detectBallHitWall,
    detectBallInHole,
    reflectVector
} from "../collisions.js";
import {handleControls} from "../controls.js";

export class Playing {
    constructor(game, states, transition) {
        this.bounces = 0;
        this.game = game;
        this.level = {};
        this.levelCompleteState = states.LEVEL_COMPLETE;
        this.pauseState = states.PAUSE;
        this.transition = transition;
    }

    aimBall(vec) {
        return () => {
            if (this.level.ball.speed !== 0) {
                return;
            }

            this.level.aimPath.setVector(vec);
        };
    }

    draw(ctx) {
        const {aimPath, ball, blocks, hole, teePad, tiles} = this.level;

        ctx.fillStyle = "#0c0";
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        hole.draw(ctx);
        teePad.draw(ctx);
        tiles.forEach(tile => {
            tile.draw(ctx);

            if (detectBallHitTile(ball, tile)) {
                ball.move({speed: 6, x: -ball.vector.x, y: -ball.vector.y});
                this.bounces += 1;
            }
        });
        blocks.forEach(block => {
            if (ball.speed === 0 && detectObjHitBlock(aimPath, block)) {
                aimPath.move(reflectVector(aimPath.vector, block.rotation));
            }

            if (detectObjHitBlock(ball, block)) {
                ball.move(6, reflectVector(ball.vector, block.rotation));
                this.bounces += 1;
            }

            block.draw(ctx);
        });
        ball.draw(ctx);

        if (ball.speed === 0) {
            aimPath.draw(ctx);
        }
    }

    load(data) {
        if (data.prev !== this.pauseState) {
            this.level = data.level;
            this.bounces = 0;
        }

        this.aimBall({x: 0, y: 1});

        handleControls({
            esc: () => {
                this.transition(this.pauseState, {level: this.level});
            },
            left: this.aimBall({x: -1, y: 1}).bind(this),
            right: this.aimBall({x: 1, y: 1}).bind(this),
            space: () => {
                if (this.level.ball.speed !== 0) {
                    return;
                }

                this.level.ball.move(7, this.level.aimPath.vector);
            },
            up: this.aimBall({x: 0, y: 1}).bind(this),
        });
    }

    render(ctx) {
        this.update();
        this.draw(ctx);

        if (this.bounces > this.level.maxBounce) {
            this.level.ball.speed = 0;
            this.transition(this.levelCompleteState, {level: this.level, success: false});
        }
    }

    update() {
        const {aimPath, ball, hole, maxBounce, name} = this.level;
        const [wallHit, wallRot] = detectBallHitWall(ball, this.game);

        document.getElementById("levelTitle").innerText = name;
        document.getElementById("bouncesLeft").innerText = `Bounces Left: ${maxBounce - this.bounces}`;

        if (wallHit) {
            const {x, y} = reflectVector(ball.vector, wallRot);

            ball.move(6, {x, y});
            this.bounces += 1;
        }

        if (detectBallInHole(ball, hole)) {
            this.transition(this.levelCompleteState, {level: this.level, success: true});
        }

        ball.update();
        aimPath.update();
    }
}
