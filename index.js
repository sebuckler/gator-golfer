import {renderState, startMachine} from "./states.js";

function main() {
    renderState();
    requestAnimationFrame(main);
}

startMachine();
requestAnimationFrame(main);
