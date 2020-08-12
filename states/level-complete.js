import {handleControls} from "../controls.js";
import {buildLevel, levels} from "../levels.js";

export class LevelComplete {
    constructor(game, states, transition) {
        this.game = game;
        this.level = {};
        this.startState = states.START_GAME;
        this.playingState = states.PLAYING;
        this.gameOverState = states.GAME_OVER;
        this.transition = transition;
    }

    load(data) {
        this.level = data.level;

        handleControls({
            enter: () => {
                const nextLvlIndex = data.level.index + 1;

                if (levels.length > nextLvlIndex) {
                    this.transition(this.playingState, {level: buildLevel(nextLvlIndex, this.game)});
                } else {
                    this.transition(this.gameOverState, {});
                }
            },
            esc: () => {
                this.transition(this.startState, {});
            },
        });
    }

    render(ctx) {
        ctx.fillStyle = "#0c0";
        ctx.fillRect(0, 0, this.game.width, this.game.height);
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
    }
}
