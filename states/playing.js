import {stateNames} from "../engine/fsm.js";
import {handleInput} from "../engine/input.js";
import {Vector} from "../engine/vector.js";

export class Playing {
    constructor(game) {
        this.game = game;
        this.bounces = 0;
        this.level = {};
    }

    load(data, transition) {
        if (data.prev !== stateNames.PAUSE) {
            this.level = data.level;
            this.bounces = 0;
        }

        document.getElementById("levelTitle").innerText = this.level.name;

        this.aimBall(0, -1);

        handleInput({
            esc: () => {
                transition(stateNames.PAUSE, {level: this.level});
            },
            left: () => {
                this.aimBall(-1, -1);
            },
            right: () => {
                this.aimBall(1, -1);
            },
            up: () => {
                this.aimBall(0, -1);
            },
            space: () => {
                if (this.level.ball.velocity.magnitude !== 0) {
                    return;
                }

                let velocity = this.level.aimPath.velocity.copy();
                velocity.multiplyScalar(512);

                this.level.ball.move(velocity);
            },
        });
    }

    update(deltaTime) {
        const {aimPath, ball, maxBounce} = this.level;

        document.getElementById("bouncesLeft").innerText = `Bounces Left: ${maxBounce - this.bounces}`;

        ball.update(deltaTime);
        aimPath.update();

        if (this.bounces > this.level.maxBounce) {
            this.level.ball.speed = 0;

            return {
                to: stateNames.LEVEL_COMPLETE,
                data: {level: this.level, success: false},
            };
        }

        return this.detectCollisions();
    }

    render(ctx) {
        const {aimPath, ball, blocks, hole, teePad, tiles} = this.level;

        ctx.fillStyle = "#0c0";
        ctx.fillRect(0, 0, this.game.width, this.game.height);

        hole.draw(ctx);
        teePad.draw(ctx);
        tiles.forEach((tile) => {
            tile.draw(ctx);
        });
        blocks.forEach((block) => {
            block.draw(ctx);
        });
        ball.draw(ctx);

        if (ball.speed === 0) {
            aimPath.draw(ctx);
        }
        ;
    }

    aimBall(x, y) {
        if (this.level.ball.velocity.magnitude !== 0) {
            return;
        }

        this.level.aimPath.move(new Vector(x, y));
    }

    detectCollisions() {
        const {ball, blocks, hole} = this.level;
        let collisions = [];

        ball.collideObject(hole, collisions);
        if (collisions.length > 0) {
            this.level.ball.speed = 0;

            return {
                to: stateNames.LEVEL_COMPLETE,
                data: {level: this.level, success: true},
            };
        }

        ball.collideWall(this.game, collisions)
        if (collisions.length > 0) {
            this.bounces += 1;

            if (collisions.length === 1) {
                ball.velocity.reflect(collisions[0]);
            } else {
                ball.velocity.multiplyScalar(-1);
            }

            return;
        }

        let collidedObjects = [];

        blocks.filter((block) => ball.collideNarrowPhase(block))
            .forEach((block) => {
                let collisionCount = collisions.length;

                ball.collideObject(block, collisions);

                if (collisions.length > collisionCount) {
                    collidedObjects.push(block);
                }
            });

        if (collisions.length > 0) {
            this.bounces += 1;

            this.resolveCollisions(collidedObjects, collisions);
        }
    }

    resolveCollisions(collidedObjects, collisions) {
        const {ball} = this.level;

        if (collisions.length === 1) {
            ball.velocity.reflect(collisions[0]);
        } else {
            let magnitudes = collisions.map((collision) => collision.magnitude);

            ball.velocity.reflect(
                collisions.filter((collision) => collision.magnitude <= Math.min(...magnitudes))[0]
            );
        }
    }
}
