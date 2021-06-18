import {stateNames} from "../engine/fsm.js";
import {handleInput} from "../engine/input.js";
import {buildLevel} from "../levels/levels.js";

export class StartGame {
    constructor(game) {
        this.game = game;
        this.splashScreenImage = document.getElementById("splashScreen");
    }

    load(data, transition) {
        handleInput({
            enter: () => {
                transition(stateNames.PLAYING, {level: buildLevel(0, this.game)});
            },
        });
    }

    update(deltaTime) {
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
