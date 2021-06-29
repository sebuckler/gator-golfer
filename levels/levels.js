import {Rectangle, Triangle} from "../engine/shape.js";
import {Vector} from "../engine/vector.js";
import {AimPath} from "../objects/aim-path.js";
import {Block} from "../objects/block.js";
import {GolfBall} from "../objects/golf-ball.js";
import {Hole} from "../objects/hole.js";
import {TeePad} from "../objects/tee-pad.js";

export function buildLevel(n) {
    const {field, maxBounce, name} = levels[n];
    const level = {
        blocks: [],
        grid: [],
        index: n,
        maxBounce,
        name,
        tiles: [],
    };

    field.forEach((row, rowIndex) => {
        row.forEach((obj, objIndex) => {
            const x = objIndex * 64;
            const y = rowIndex * 64;

            switch (obj) {
                case "o":
                    level.hole = new Hole(x, y);
                    break;
                case "t":
                    level.teePad = new TeePad(x, y);
                    level.ball = new GolfBall(x, y);
                    level.aimPath = new AimPath(x, y);
                    break;
                case 1:
                    level.blocks.push(new Block(
                        x, y,
                        new Rectangle(new Vector(0, 0), new Vector(64, 64)),
                        "block",
                    ));
                    break;
                case 2:
                    level.blocks.push(new Block(
                        x, y,
                        new Triangle(
                            new Vector(0, 0),
                            new Vector(64, 0),
                            new Vector(64, 64),
                        ),
                        "triBlockTR",
                    ));
                    break;
                case 3:
                    level.blocks.push(new Block(
                        x, y,
                        new Triangle(
                            new Vector(64, 0),
                            new Vector(64, 64),
                            new Vector(0, 64),
                        ),
                        "triBlockBR",
                    ));
                    break;
                case 4:
                    level.blocks.push(new Block(
                        x, y,
                        new Triangle(
                            new Vector(0, 0),
                            new Vector(0, 64),
                            new Vector(64, 64),
                        ),
                        "triBlockBL",
                    ));
                    break;
                case 5:
                    level.blocks.push(new Block(
                        x, y,
                        new Triangle(
                            new Vector(0, 0),
                            new Vector(64, 0),
                            new Vector(0, 64),
                        ),
                        "triBlockTL",
                    ));
                    break;
                case 6:
                    level.blocks.push(new Block(
                        x, y,
                        new Rectangle(new Vector(16, 0), new Vector(48, 64)),
                        "blockVert",
                    ));
                    break;
                case 7:
                    level.blocks.push(new Block(
                        x, y,
                        new Rectangle(new Vector(0, 16), new Vector(64, 48)),
                        "blockHorz",
                    ));
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
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, "o", 2, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, "t", 1, 1, 1, 1, 1, 1, 1],
        ],
        maxBounce: 1,
        name: "Hole 1",
    },
    {
        field: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 5, 0, 2, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 4, 0, 0, 0, "o", 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, "t", 1, 1, 1, 1, 1, 1, 1],
        ],
        maxBounce: 3,
        name: "Hole 2",
    },
    {
        field: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 7, 0, 7, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, "o", 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, "t", 0, 1, 1, 1, 1, 1, 1],
        ],
        maxBounce: 7,
        name: "Hole 3",
    }
];
