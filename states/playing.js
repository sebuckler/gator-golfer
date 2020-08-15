import {
    detectBallHitBlock,
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

    drawObjects(ctx) {
        const {ball, blocks, hole, teePad, tiles} = this.level;

        tiles.forEach(tile => {
            tile.draw(ctx);

            if (detectBallHitTile(ball, tile)) {
                ball.move({speed: 6, x: -ball.vector.x, y: -ball.vector.y});
                this.bounces += 1;
            }
        });
        blocks.forEach(block => {
            block.draw(ctx);

            if (detectBallHitBlock(ball, block)) {
                const {x, y} = reflectVector(ball.vector, block.rotation);

                ball.move({speed: 6, x, y});
                this.bounces += 1;
            }
        });
        hole.draw(ctx);
        teePad.draw(ctx);
        ball.draw(ctx);
    }

    load(data) {
        if (data.prev !== this.pauseState) {
            this.level = data.level;
            this.bounces = 0;
        }

        handleControls({
            esc: () => {
                this.transition(this.pauseState, {level: this.level});
            },
            left: () => {
                if (this.level.ball.speed !== 0) {
                    return;
                }

                this.level.ball.move({speed: 7, x: -1, y: 1});
            },
            right: () => {
                if (this.level.ball.speed !== 0) {
                    return;
                }

                this.level.ball.move({speed: 7, x: 1, y: 1});
            },
            space: () => {
                if (this.level.ball.speed !== 0) {
                    return;
                }

                this.level.ball.move({speed: 7, x: 0, y: 1});
            }
        });
    }

    render(ctx) {
        const {ball, hole, maxBounce} = this.level;
        const [wallHit, wallRot] = detectBallHitWall(ball, this.game);

        if (wallHit) {
            const {x, y} = reflectVector(ball.vector, wallRot);

            ball.move({speed: 6, x, y});
            this.bounces += 1;
        }

        if (detectBallInHole(ball, hole)) {
            this.transition(this.levelCompleteState, {level: this.level, success: true});
        }

        if (this.bounces > maxBounce) {
            ball.speed = 0;
            this.transition(this.levelCompleteState, {level: this.level, success: false});
        }

        ctx.fillStyle = "#0c0";
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        ball.update();
        this.updateGameInfo();
        this.drawObjects(ctx);
    }

    updateGameInfo() {
        const {maxBounce, name} = this.level;

        document.getElementById("levelTitle").innerText = name;
        document.getElementById("bouncesLeft").innerText = `Bounces Left: ${maxBounce - this.bounces}`;
    }
}
