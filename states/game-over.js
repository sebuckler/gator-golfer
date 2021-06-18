import {stateNames} from "../engine/fsm.js";
import {handleInput} from "../engine/input.js";

export class GameOver {
    constructor(game) {
        this.game = game;
        this.level = {};
    }

    load(data, transition) {
        document.getElementById("levelTitle").innerHTML = "&nbsp;";
        document.getElementById("bouncesLeft").innerHTML = "&nbsp;";

        handleInput({
            enter: () => {
                transition(stateNames.START_GAME, {});
            }
        });
    }

    update(deltaTime) {
    }

    render(ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        ctx.fillStyle = "#0c0";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "48px mono";
        ctx.fillText("Game Over", this.game.width / 2, this.game.height / 2 - 64);
        ctx.font = "32px mono";
        ctx.fillText("Press ENTER to restart", this.game.width / 2, this.game.height / 2 + 128);
    }
}
