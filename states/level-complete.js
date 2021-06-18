import {stateNames} from "../engine/fsm.js";
import {handleInput} from "../engine/input.js";
import {buildLevel, levels} from "../levels/levels.js";

export class LevelComplete {
    constructor(game) {
        this.game = game;
        this.canAdvance = false;
        this.level = {};
        this.timeElapsed = 0;
        this.timeout = 3;
        this.transition = () => {};
    }

    load(data, transition) {
        this.canAdvance = data.success;
        this.level = data.level;
        this.timeElapsed = 0;
        this.transition = transition;

        handleInput({
            enter: this.goToNextLevel.bind(this),
            esc: () => {
                transition(stateNames.START_GAME, {});
            },
        });
    }

    update(deltaTime) {
        const {ball, hole} = this.level;
        this.timeElapsed += deltaTime;

        if (this.timeElapsed > this.timeout) {
            this.goToNextLevel();
        }

        if (this.canAdvance) {
            ball.position.x = hole.position.x + (hole.size - ball.size) / 2;
            ball.position.y = hole.position.y + (hole.size - ball.size) / 2;
        }
    }

    render(ctx) {
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

    drawObjects(ctx) {
        const {ball, blocks, hole, teePad, tiles} = this.level;

        hole.draw(ctx);
        teePad.draw(ctx);
        tiles.forEach((tile) => {
            tile.draw(ctx);
        });
        blocks.forEach((block) => {
            block.draw(ctx);
        });
        ball.draw(ctx);
    }

    goToNextLevel() {
        const nextLvlIndex = this.level.index + 1;

        if (!this.canAdvance) {
            this.transition(stateNames.PLAYING, {level: buildLevel(this.level.index)});
        } else if (levels.length > nextLvlIndex) {
            this.transition(stateNames.PLAYING, {level: buildLevel(nextLvlIndex)});
        } else {
            this.transition(stateNames.GAME_OVER, {});
        }
    }
}
