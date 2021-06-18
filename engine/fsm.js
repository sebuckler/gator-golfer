import {resetInputHandlers} from "./input.js";
import {buildLevel} from "../levels/levels.js";
import {GameOver} from "../states/game-over.js";
import {LevelComplete} from "../states/level-complete.js";
import {Pause} from "../states/pause.js";
import {Playing} from "../states/playing.js";
import {StartGame} from "../states/start-game.js";

export const stateNames = {
    START_GAME: 0,
    PLAYING: 1,
    PAUSE: 2,
    LEVEL_COMPLETE: 3,
    GAME_OVER: 4,
};

export class StateMachine {
    constructor(game) {
        this.game = game;
        this.states = {
            [stateNames.START_GAME]: new StartGame(game),
            [stateNames.PLAYING]: new Playing(game),
            [stateNames.PAUSE]: new Pause(game),
            [stateNames.LEVEL_COMPLETE]: new LevelComplete(game),
            [stateNames.GAME_OVER]: new GameOver(game),
        };
        this.currentState = this.states[stateNames.START_GAME];
    }

    start(level = 0) {
        let data = {};
        let state = stateNames.START_GAME;

        if (level > 0) {
            data = {level: buildLevel(level)};
            state = stateNames.PLAYING;
        }

        this.transition(state, data);
    }

    updateState(deltaTime) {
        return this.currentState.update(deltaTime);
    }

    renderState(ctx) {
        ctx.clearRect(0, 0, this.game.width, this.game.height);
        this.currentState.render(ctx);
    }

    transition(state, data) {
        this.currentState = this.states[state];

        resetInputHandlers();
        this.currentState.load(data, this.transition.bind(this));
    }
}
