import Phaser   from '../../helper/phaser-helper';
import {gridMap} from '../../helper/math-helper';

export default class SpriteGrid extends Phaser.Group {
    constructor(game, x, y, n, m, cellWidth, cellHeight, SpriteClass) {
        super(game);
        this.addMultiple(gridMap(n, m, i => j => {
            const cellX = x + cellWidth  * i;
            const cellY = y + cellHeight * j;
            const frame = SpriteClass.FrameMap(i, j);
            return new SpriteClass(this.game, cellX, cellY, frame);
        }));
    }
}