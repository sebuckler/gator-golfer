import {resetControls} from "./controls.js";
import {GameOver} from "./states/game-over.js";
import {LevelComplete} from "./states/level-complete.js";
import {Pause} from "./states/pause.js";
import {Playing} from "./states/playing.js";
import {StartGame} from "./states/start-game.js";

export class StateMachine {
    constructor(game) {
        const boundTransition = this.transition.bind(this);
        this.currentState = {};
        this.game = game;
        this.stateNames = {
            START_GAME: 0,
            PLAYING: 1,
            PAUSE: 2,
            LEVEL_COMPLETE: 3,
            GAME_OVER: 4,
        };
        this.states = {
            [this.stateNames.START_GAME]: new StartGame(game, this.stateNames, boundTransition),
            [this.stateNames.PLAYING]: new Playing(game, this.stateNames, boundTransition),
            [this.stateNames.PAUSE]: new Pause(game, this.stateNames, boundTransition),
            [this.stateNames.LEVEL_COMPLETE]: new LevelComplete(game, this.stateNames, boundTransition),
            [this.stateNames.GAME_OVER]: new GameOver(game, this.stateNames, boundTransition),
        };
    }

    render(ctx) {
        ctx.clearRect(0, 0, this.game.width, this.game.height);
        this.currentState.render(ctx);
    }

    start(level = 0) {
        const {PLAYING, START_GAME} = this.stateNames;
        this.transition(level > 0 ? PLAYING : START_GAME, {})
    }

    transition(to, data) {
        this.currentState = this.states[to];

        resetControls();
        this.currentState.load(data);
    }
}
