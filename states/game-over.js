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
        ctx.clearRect(0, 0, this.game.width, this.game.height);
    }
}
