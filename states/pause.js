import {stateNames} from "../engine/fsm.js";
import {handleInput} from "../engine/input.js";

export class Pause {
    constructor(game) {
        this.game = game;
        this.level = {};
    }

    load(data, transition) {
        this.level = data.level;

        handleInput({
            esc: () => {
                transition(stateNames.PLAYING, {prev: stateNames.PAUSE});
            },
        });
    }

    update(deltaTime) {
    }

    render(ctx) {
        ctx.fillStyle = "#0c0";
        ctx.fillRect(0, 0, this.game.width, this.game.height);

        this.level.tiles.forEach((tile) => {
            tile.draw(ctx);
        });
        this.level.blocks.forEach((block) => {
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
