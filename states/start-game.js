import {handleControls} from "../controls.js";
import {buildLevel} from "../levels.js";

export class StartGame {
    constructor(game, states, transition) {
        this.game = game;
        this.playingState = states.PLAYING;
        this.transition = transition;
    }

    load() {
        handleControls({
            enter: () => {
                this.transition(this.playingState, {level: buildLevel(0, this.game)});
            },
        });
    }

    render(ctx) {
        ctx.fillStyle = "#0c0";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "48px mono";
        ctx.fillText("Gator Golfer!", this.game.width / 2, this.game.height / 2);
        ctx.font = "32px mono";
        ctx.fillText("Press ENTER", this.game.width / 2, this.game.height / 2 + 128);
    }
}
