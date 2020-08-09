import {Block} from "./objects/block.js";
import {GolfBall} from "./objects/golf-ball.js";
import {Hole} from "./objects/hole.js";
import {TeePad} from "./objects/tee-pad.js";

export const levels = [
    {
        field: [
            [0, 0, 0, 0, "-", "-", "-", "-", "-", "-", "-", 0, 0, 0, 0],
            [0, 0, 0, "|", 0, 0, 0, "\\", 0, 0, 0, "|", 0, 0, 0],
            [0, 0, 0, "|", 0, 0, "o", 0, 0, 0, 0, "|", 0, 0, 0],
            [0, 0, 0, "|", 0, 0, 0, 0, 0, 0, 0, "|", 0, 0, 0],
            [0, 0, 0, "|", 0, 0, 0, 0, 0, 0, 0, "|", 0, 0, 0],
            [0, 0, 0, 0, "-", "-", 0, 0, 0, "-", "-", 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, "t", 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        name: "Hole 1",
    },
    {
        field: [
            [0, 0, 0, 0, "-", "-", "-", "-", "-", "-", "-", 0, 0, 0, 0],
            [0, 0, 0, "|", 0, "/", 0, "\\", 0, 0, 0, "|", 0, 0, 0],
            [0, 0, 0, "|", 0, 0, 0, 0, 0, 0, 0, "|", 0, 0, 0],
            [0, 0, 0, "|", 0, "\\", 0, 0, 0, "o", 0, "|", 0, 0, 0],
            [0, 0, 0, "|", 0, 0, 0, 0, 0, 0, 0, "|", 0, 0, 0],
            [0, 0, 0, 0, "-", "-", 0, 0, 0, "-", "-", 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 0, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, "t", 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        name: "Hole 2",
    }
];

export function buildLevel(n, game) {
    const {field, name} = levels[n];
    const level = {
        blocks: [],
        index: n,
        name,
    };

    field.forEach((row, rowIndex) => {
        row.forEach((obj, objIndex) => {
            let x = objIndex * game.gridUnit;
            let y = rowIndex * game.gridUnit;

            switch (obj) {
                case "o":
                    level.hole = new Hole(game, [x, y]);
                    break;
                case "|":
                    level.blocks.push(new Block(game, [x, y], [0, 1]));
                    break;
                case "/":
                    level.blocks.push(new Block(game, [x, y], [1, 1]));
                    break;
                case "-":
                    level.blocks.push(new Block(game, [x, y], [1, 0]));
                    break;
                case "\\":
                    level.blocks.push(new Block(game, [x, y], [-1, 1]));
                    break;
                case "t":
                    level.teePad = new TeePad(game, [x, y]);
                    level.ball = new GolfBall(game, [x, y]);
                    break;
                default:
                    break;
            }
        });
    });

    return level;
}
