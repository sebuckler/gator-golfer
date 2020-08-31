import {handleControls} from "../controls.js";
import {buildLevel} from "../levels.js";

export class StartGame {
    constructor(game, states, transition) {
        this.game = game;
        this.playingState = states.PLAYING;
        this.splashScreenImage = document.getElementById("splashScreen");
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
        ctx.drawImage(this.splashScreenImage, 0, 0);
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "48px mono";
        ctx.fillText("Gator Golfer!", this.game.width / 2, this.game.height / 2 - 64);
        ctx.font = "32px mono";
        ctx.fillText("Press ENTER", this.game.width / 2, this.game.height / 2 + 128);
    }
}
