import Phaser from '../helper/phaser-helper';
import Brick       from './brick';
import {gridEach}  from '../helper/utility-functions';

export default class Bricks {
    
    static Preload(state) {
        Brick.Preload(state);
    }
    
    static Create(state) {
        const brickGroupX = 120;
        const brickGroupY = 100; 
        const brickRowCount = 4;
        const brickColumnCount = 15;
        const gridCellWidth = 36;
        const gridCellHeight = 52;
        state.bricks = state.game.add.group();
        state.bricks.enableBody = true;
        state.bricks.physicsBodyType = Phaser.Physics.ARCADE;
        gridEach(brickRowCount, brickColumnCount, i => j => {
            const brickX = brickGroupX + gridCellWidth  * i;
            const brickY = brickGroupY + gridCellHeight * j;
            let brick = state.bricks.create(brickX, brickY, 'breakout', 'brick_' + (j + 1) + '_1.png');
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        });
    }
}