import {StateMachine} from "./machine.js";

const ctx = document.getElementById("gameCanvas").getContext("2d");
const game = {
    gridUnit: 64,
    height: 13 * 64,
    time: 0,
    width: 15 * 64,
};
const machine = new StateMachine(game);

function main(timestamp) {
    game.time = timestamp;

    machine.render(ctx);
    requestAnimationFrame(main);
}

machine.start();
requestAnimationFrame(main);
