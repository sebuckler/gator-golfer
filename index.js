import {FrameTime} from "./engine/frame-time.js";
import {StateMachine} from "./engine/fsm.js";

const ctx = document.getElementById("gameCanvas").getContext("2d");
const game = {
    height: 13 * 64,
    width: 15 * 64,
};
const frameTime = new FrameTime(30, 60);
const machine = new StateMachine(game);
let updateResult = null;

function main(timestamp) {
    frameTime.upTick(timestamp);

    while(frameTime.shouldDownTick()) {
        updateResult = machine.updateState(frameTime.delta);
        frameTime.downTick();
    }

    machine.renderState(ctx);

    if (updateResult != null) {
        machine.transition(updateResult.to, updateResult.data);
    }

    requestAnimationFrame(main);
}

machine.start();
requestAnimationFrame(main);
