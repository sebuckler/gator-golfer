import {handleControls} from "../controls.js";

export class GameOver {
    constructor(game, states, transition) {
        this.game = game;
        this.level = {};
        this.startState = states.START_GAME;
        this.transition = transition;
    }

    load() {
        document.getElementById("levelTitle").innerHTML = "&nbsp;";
        document.getElementById("bouncesLeft").innerHTML = "&nbsp;";

        handleControls({
            enter: () => {
                this.transition(this.startState, {});
            }
        });
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
