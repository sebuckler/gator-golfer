import {stateNames} from "../engine/fsm.js";
import {handleInput} from "../engine/input.js";
import {Vector} from "../engine/vector.js";

const collisionHit = Object.freeze({
    hole: 0,
    wall: 1,
    object: 2,
});

export class Playing {
    constructor(game) {
        this.game = game;
        this.aiming = true;
        this.bounces = 0;
        this.level = {};
    }

    load(data, transition) {
        if (data.prev !== stateNames.PAUSE) {
            this.aiming = true;
            this.bounces = 0;
            this.level = data.level;
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
                const {aimPath, ball} = this.level;

                if (!this.aiming) {
                    return;
                }

                ball.move(aimPath.aimDirection.copy());
                this.aiming = false;
            },
        });
    }

    update(deltaTime) {
        const {aimPath, ball, maxBounce} = this.level;

        document.getElementById("bouncesLeft").innerText = `Bounces Left: ${maxBounce - this.bounces}`;

        if (this.bounces > maxBounce) {
            ball.stop();

            return {
                to: stateNames.LEVEL_COMPLETE,
                data: {level: this.level, success: false},
            };
        }

        let collisionResult;
        if (this.aiming) {
            aimPath.update(deltaTime);
            collisionResult = this.detectAimPathCollisions();
        } else {
            ball.update(deltaTime);
            collisionResult = this.detectBallCollisions();
        }

        return this.resolveCollisions(collisionResult);
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

        if (this.aiming) {
            aimPath.draw(ctx);
        }
    }

    aimBall(x, y) {
        const {aimPath, ball} = this.level;

        if (!this.aiming) {
            return;
        }

        let velocity = new Vector(x, y);
        velocity.multiplyScalar(512);

        aimPath.move(velocity);
    }

    detectAimPathCollisions() {
        const {aimPath} = this.level;

        return this.detectObjectCollisions(aimPath, [], () => {
            aimPath.addContact();
        });
    }

    detectBallCollisions() {
        const {ball, hole} = this.level;
        let collisions = [];

        ball.collideObject(hole, collisions);
        if (collisions.length > 0) {
            ball.stop();

            return {
                hit: collisionHit.hole,
                collisions,
            };
        }

        return this.detectObjectCollisions(ball, collisions, () => {
            this.bounces += 1;
        });
    }

    detectObjectCollisions(object, collisions, action) {
        const {blocks} = this.level;

        object.collideWall(this.game, collisions)
        if (collisions.length > 0) {
            return {
                hit: collisionHit.wall,
                object,
                collisions,
                action,
            };
        }

        blocks.filter((block) => object.collideBroadPhase(block))
            .forEach((block) => {
                object.collideObject(block, collisions);
            });

        return {
            hit: collisionHit.object,
            object,
            collisions,
            action,
        }
    }

    resolveCollisions(collisionResult) {
        if (collisionResult == null || collisionResult.collisions.length === 0) {
            return;
        }

        let {collisions, hit, object, action} = collisionResult;

        switch (hit) {
            case collisionHit.hole:
                return {
                    to: stateNames.LEVEL_COMPLETE,
                    data: {level: this.level, success: true},
                };
            case collisionHit.wall:
                if (collisions.length === 1) {
                    object.velocity.reflect(collisions[0]);
                } else {
                    object.velocity.multiplyScalar(-1);
                }

                action();

                break;
            case collisionHit.object:
                if (collisions.length === 1) {
                    object.velocity.reflect(collisions[0]);
                } else {
                    let magnitudes = collisions.map((collision) => collision.magnitude);

                    object.velocity.reflect(
                        collisions.filter((collision) => collision.magnitude <= Math.min(...magnitudes))[0]
                    );
                }

                action();

                break;
            default:
                return;
        }
    }
}
