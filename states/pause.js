import {handleControls} from "../controls.js";
import {buildLevel, levels} from "../levels.js";

export class Pause {
    constructor(game, states, transition) {
        this.game = game;
        this.level = {};
        this.pauseState = states.PAUSE;
        this.playingState = states.PLAYING;
        this.transition = transition;
    }

    load(data) {
        this.level = data.level;

        handleControls({
            esc: () => {
                this.transition(this.playingState, {prev: this.pauseState});
            },
        });
    }

    render(ctx) {
        ctx.fillStyle = "#0c0";
        ctx.fillRect(0, 0, this.game.width, this.game.height);

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
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        ctx.font = "48px mono";
        ctx.fillStyle = "#afa";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.game.width / 2, this.game.height / 2);
        ctx.font = "32px mono";
        ctx.fillText("press ESC to resume", this.game.width / 2, this.game.height / 2 + 128);
    }
}
