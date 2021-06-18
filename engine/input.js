const key = {
    ENTER: "Enter",
    ESCAPE: "Escape",
    LEFT: "ArrowLeft",
    NUMPAD_ENTER: "NumpadEnter",
    RIGHT: "ArrowRight",
    SPACE: "Space",
    UP: "ArrowUp",
}
let handlers = {};

document.addEventListener("keydown", (event) => {
    if (handlers[event.code] != null) {
        handlers[event.code]();
        event.preventDefault();
    }
});

export function handleInput({enter, esc, left, right, space, up}) {
    handlers[key.ENTER] = enter;
    handlers[key.LEFT] = left;
    handlers[key.NUMPAD_ENTER] = enter;
    handlers[key.RIGHT] = right;
    handlers[key.ESCAPE] = esc;
    handlers[key.SPACE] = space;
    handlers[key.UP] = up;
}

export function resetInputHandlers() {
    handlers = {};
}
