const key = {
    ENTER: "Enter",
    ESCAPE: "Escape",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    SPACE: "Space",
}
let handlers = {};

document.addEventListener("keydown", (ev) => {
    if (handlers[ev.code] != null) {
        handlers[ev.code]();
    }
});

export function handleControls({enter, esc, left, right, space}) {
    handlers[key.ENTER] = enter;
    handlers[key.LEFT] = left;
    handlers[key.RIGHT] = right;
    handlers[key.ESCAPE] = esc;
    handlers[key.SPACE] = space;
}

export function resetControls() {
    handlers = {};
}
