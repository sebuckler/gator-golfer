const key = {
    ENTER: "Enter",
    ESCAPE: "Escape",
    SPACE: "Space",
}
let handlers = {};

document.addEventListener("keydown", (ev) => {
    if (handlers[ev.code] != null) {
        handlers[ev.code]();
    }
});

export function handleControls({enter, esc, space}) {
    handlers[key.ENTER] = enter;
    handlers[key.ESCAPE] = esc;
    handlers[key.SPACE] = space;
}

export function resetControls() {
    handlers = {};
}
