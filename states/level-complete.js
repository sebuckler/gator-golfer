import {handleControls} from "../controls.js";
import {buildLevel, levels} from "../levels.js";

export class LevelComplete {
    constructor(game, states, transition) {
        this.canAdvance = false;
        this.game = game;
        this.level = {};
        this.startState = states.START_GAME;
        this.startTime = 0;
        this.timeout = 3000;
        this.playingState = states.PLAYING;
        this.gameOverState = states.GAME_OVER;
        this.transition = transition;
    }

    drawObjects(ctx) {
        const {ball, blocks, hole, teePad, tiles} = this.level;

        hole.draw(ctx);
        teePad.draw(ctx);
        tiles.forEach(tile => {
            tile.draw(ctx);
        });
        blocks.forEach(block => {
            block.draw(ctx);
        });
        ball.draw(ctx);
    }

    goToNextLevel() {
        const nextLvlIndex = this.level.index + 1;

        if (!this.canAdvance) {
            this.transition(this.playingState, {level: buildLevel(this.level.index, this.game)});
        } else if (levels.length > nextLvlIndex) {
            this.transition(this.playingState, {level: buildLevel(nextLvlIndex, this.game)});
        } else {
            this.transition(this.gameOverState, {});
        }
    }

    load(data) {
        this.canAdvance = data.success;
        this.level = data.level;
        this.startTime = this.game.time;

        handleControls({
            enter: this.goToNextLevel.bind(this),
            esc: () => {
                this.transition(this.startState, {});
            },
        });
    }

    render(ctx) {
        const {ball, hole} = this.level;

        if (this.game.time > this.startTime + this.timeout) {
            this.goToNextLevel();
        }

        if (this.canAdvance) {
            ball.position.x = hole.position.x + (hole.size - ball.size) / 2;
            ball.position.y = hole.position.y + (hole.size - ball.size) / 2;
        }

        ctx.fillStyle = "#0c0";
        ctx.fillRect(0, 0, this.game.width, this.game.height);

        this.drawObjects(ctx);

        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        ctx.font = "48px mono";
        ctx.fillStyle = "#afa";
        ctx.textAlign = "center";
        ctx.fillText(`Level ${this.canAdvance ? "Complete" : "Failed"}`, this.game.width / 2, this.game.height / 2);
        ctx.font = "32px mono";
        ctx.fillText("press ENTER to continue", this.game.width / 2, this.game.height / 2 + 128);
    }
}
