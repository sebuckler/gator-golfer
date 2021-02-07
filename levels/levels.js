import {AimPath} from "../objects/aim-path.js";
import {Block} from "../objects/block.js";
import {GolfBall} from "../objects/golf-ball.js";
import {Hole} from "../objects/hole.js";
import {TeePad} from "../objects/tee-pad.js";
import {Tile} from "../objects/tile.js";

export function buildLevel(n, game) {
    const {field, maxBounce, name} = levels[n];
    const level = {
        blocks: [],
        index: n,
        maxBounce,
        name,
        tiles: [],
    };

    field.forEach((row, rowIndex) => {
        row.forEach((obj, objIndex) => {
            const x = objIndex * game.gridUnit;
            const y = rowIndex * game.gridUnit;

            switch (obj) {
                case 0:
                    level.tiles.push(new Tile(game, [x, y]));
                    break;
                case "o":
                    level.hole = new Hole(game, [x, y]);
                    break;
                case "|":
                    level.blocks.push(new Block(game, [x, y], 90));
                    break;
                case "/":
                    level.blocks.push(new Block(game, [x, y], 135));
                    break;
                case "-":
                    level.blocks.push(new Block(game, [x, y], 0));
                    break;
                case "\\":
                    level.blocks.push(new Block(game, [x, y], 45));
                    break;
                case "t":
                    level.teePad = new TeePad(game, [x, y]);
                    level.ball = new GolfBall(game, [x, y]);
                    level.aimPath = new AimPath(game, [x, y]);
                    break;
                default:
                    break;
            }
        });
    });

    return level;
}

export const levels = [
    {
        field: [
            [0, 0, 0, 0, "-", "-", "-", "-", "-", "-", "-", 0, 0, 0, 0],
            [0, 0, 0, "|", 1, 1, 1, 1, 1, 1, 1, "|", 0, 0, 0],
            [0, 0, 0, "|", 1, 1, "o", "\\", 1, 1, 1, "|", 0, 0, 0],
            [0, 0, 0, "|", 1, 1, 1, 1, 1, 1, 1, "|", 0, 0, 0],
            [0, 0, 0, "|", 1, 1, 1, 1, 1, 1, 1, "|", 0, 0, 0],
            [0, 0, 0, 0, "-", "-", 1, 1, 1, "-", "-", 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", "t", "|", 0, 0, 0, 0, 0, 0],
        ],
        maxBounce: 1,
        name: "Hole 1",
    },
    {
        field: [
            [0, 0, 0, 0, "-", "-", "-", "-", "-", "-", "-", 0, 0, 0, 0],
            [0, 0, 0, "|", 1, 1, 1, 1, 1, 1, 1, "|", 0, 0, 0],
            [0, 0, 0, "|", 1, "/", 1, "\\", 1, 1, 1, "|", 0, 0, 0],
            [0, 0, 0, "|", 1, 1, 1, 1, 1, "o", 1, "|", 0, 0, 0],
            [0, 0, 0, "|", 1, "\\", 1, 1, 1, 1, 1, "|", 0, 0, 0],
            [0, 0, 0, 0, "-", "-", 1, 1, 1, "-", "-", 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", 1, "|", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "|", "t", "|", 0, 0, 0, 0, 0, 0],
        ],
        maxBounce: 3,
        name: "Hole 2",
    },
    {
        field: [
            [0, 0, 0, "-", "-", "-", "-", "-", "-", "-", "-", "-", 0, 0, 0],
            [0, 0, "|", 1, 1, 1, 1, 1, 1, 1, 1, 1, "|", 0, 0],
            [0, 0, "|", 1, "-", 1, 1, "-", 1, 1, 1, 1, "|", 0, 0],
            [0, 0, "|", 1, 1, "o", 1, 1, 1, 1, 1, 1, "|", 0, 0],
            [0, 0, "|", 1, 1, 1, 1, 1, 1, "|", 1, 1, "|", 0, 0],
            [0, 0, "|", 1, 1, 1, 1, 1, 1, 1, 1, 1, "|", 0, 0],
            [0, 0, 0, "-", "-", 1, 1, 1, 1, 1, "-", "-", 0, 0, 0],
            [0, 0, 0, 0, 0, "|", 1, 1, 1, "|", 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, "|", 1, 1, 1, "|", 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, "|", 1, 1, 1, "|", 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, "|", 1, 1, 1, "|", 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, "|", 1, 1, 1, "|", 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, "|", 1, "t", 1, "|", 0, 0, 0, 0, 0],
        ],
        maxBounce: 7,
        name: "Hole 3",
    }
];