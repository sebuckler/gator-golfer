import {handleControls} from "../controls.js";
import {buildLevel, levels} from "../levels.js";

export class LevelComplete {
    constructor(game, states, transition) {
        this.game = game;
        this.level = {};
        this.startState = states.START_GAME;
        this.startTime = 0;
        this.timeout = 3000;
        this.playingState = states.PLAYING;
        this.gameOverState = states.GAME_OVER;
        this.transition = transition;
    }

    goToNextLevel() {
        const nextLvlIndex = this.level.index + 1;

        if (levels.length > nextLvlIndex) {
            this.transition(this.playingState, {level: buildLevel(nextLvlIndex, this.game)});
        } else {
            this.transition(this.gameOverState, {});
        }
    }

    load(data) {
        this.level = data.level;
        this.startTime = this.game.time;

        handleControls({
            enter: this.goToNextLevel,
            esc: () => {
                this.transition(this.startState, {});
            },
        });
    }

    render(ctx) {
        const {ball, blocks, hole, teePad, tiles} = this.level;

        if (this.game.time > this.startTime + this.timeout) {
            this.goToNextLevel();
        }

        ctx.fillStyle = "#0c0";
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        hole.draw(ctx);
        teePad.draw(ctx);
        tiles.forEach(tile => {
            tile.draw(ctx);
        });
        blocks.forEach(block => {
            block.draw(ctx);
        });
        ball.position.x = hole.position.x + (hole.size - ball.size) / 2;
        ball.position.y = hole.position.y + (hole.size - ball.size) / 2;
        ball.draw(ctx);
    }
}
