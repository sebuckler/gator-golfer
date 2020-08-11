import {
    detectBallHitBlock,
    detectBallHitTile,
    detectBallHitWall,
    detectBallInHole,
    reflectVector
} from "./collisions.js";
import {handleControls, resetControls} from "./controls.js";
import {buildLevel, levels} from "./levels.js";

const ctx = document.getElementById("gameScreen").getContext("2d");
const game = {
    gridUnit: 64,
    height: 64 * 13,
    width: 64 * 15,
};
let currentLevel = 0;
let currentState = {};

const states = {
    start: {
        load() {
            handleControls({
                enter: () => {
                    transition(states.playing, {level: buildLevel(0, game)});
                },
            });
        },
        render() {
            ctx.fillStyle = "#0c0";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "48px mono";
            ctx.fillText("Gator Golfer!", game.width / 2, game.height / 2);
            ctx.font = "32px mono";
            ctx.fillText("Press ENTER", game.width / 2, game.height / 2 + 128);
        },
    },
    playing: {
        bounces: 0,
        level: {},
        load(data) {
            if (data.prev !== "pause") {
                this.level = data.level;
                this.bounces = 0;
            }

            handleControls({
                esc: () => {
                    transition(states.pause, {level: this.level});
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
        },
        render() {
            const {ball, blocks, hole, teePad, tiles} = this.level;

            ctx.fillStyle = "#0c0";
            ctx.fillRect(0, 0, game.width, game.height);
            ball.update();

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

            const [wallHit, wallRot] = detectBallHitWall(ball, game);

            if (wallHit) {
                const {x, y} = reflectVector(ball.vector, wallRot);

                ball.move({speed: 6, x, y});
                this.bounces += 1;
            }

            if (detectBallInHole(ball, hole)) {
                transition(states.levelComplete, {level: this.level});
            }

            if (this.bounces > this.level.maxBounce) {
                ball.speed = 0;
            }
        },
    },
    pause: {
        level: {},
        load(data) {
            this.level = data.level;

            handleControls({
                esc: () => {
                    transition(states.playing, {prev: "pause"});
                },
            });
        },
        render() {
            ctx.fillStyle = "#0c0";
            ctx.fillRect(0, 0, game.width, game.height);

            this.level.tiles.forEach(tile => {
                tile.draw(ctx);
            });
            this.level.blocks.forEach(block => {
                block.draw(ctx);
            });
            this.level.hole.draw(ctx);
            this.level.teePad.draw(ctx);
            this.level.ball.draw(ctx);

            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, game.width, game.height);
            ctx.font = "48px mono";
            ctx.fillStyle = "#afa";
            ctx.textAlign = "center";
            ctx.fillText("Paused", game.width / 2, game.height / 2);
            ctx.font = "32px mono";
            ctx.fillText("press ESC to resume", game.width / 2, game.height / 2 + 128);
        }
    },
    levelComplete: {
        level: {},
        load(data) {
            this.level = data.level;

            handleControls({
                enter: () => {
                    const nextLvlIndex = data.level.index + 1;

                    if (levels.length > nextLvlIndex) {
                        transition(states.playing, {level: buildLevel(nextLvlIndex, game)});
                    } else {
                        transition(states.gameOver);
                    }
                },
                esc: () => {
                    transition(states.start, {});
                },
            });
        },
        render() {
            ctx.fillStyle = "#0c0";
            ctx.fillRect(0, 0, game.width, game.height);
            this.level.hole.draw(ctx);
            this.level.teePad.draw(ctx);

            this.level.tiles.forEach(tile => {
                tile.draw(ctx);
            });
            this.level.blocks.forEach(block => {
                block.draw(ctx);
            });
            this.level.ball.position.x = this.level.hole.position.x + (this.level.hole.size - this.level.ball.size) / 2;
            this.level.ball.position.y = this.level.hole.position.y + (this.level.hole.size - this.level.ball.size) / 2;
            this.level.ball.draw(ctx);
        },
    },
    gameOver: {
        load() {
            handleControls({
                enter: () => {
                    transition(states.start, {});
                }
            });
        },
        render() {
            ctx.clearRect(0, 0, game.width, game.height);
        },
    },
};

function transition(to, data) {
    currentState = to;

    resetControls();
    currentState.load(data);
}

export function renderState() {
    ctx.clearRect(0, 0, game.width, game.height);
    currentState.render();
}

export function startMachine(gw, gh, level = 0) {
    currentLevel = level;
    transition(currentLevel > 0 ? states.playing : states.start, {});
}
