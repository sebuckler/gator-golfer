import {StateMachine} from "./machine.js";

const ctx = document.getElementById("gameScreen").getContext("2d");
const game = {
    gridUnit: 64,
    height: 13 * 64,
    width: 15 * 64,
};
const machine = new StateMachine(game);

function main() {
    machine.render(ctx);
    requestAnimationFrame(main);
}

machine.start();
requestAnimationFrame(main);
