import SpriteGrid from './base/sprite-grid';
import Brick      from './brick';
import config     from '../config';
import {NextLevel, BrickKilled} from '../core/events';

export default class Bricks {
    
    static Preload(state) {
        Brick.Preload(state);
    }
    
    static Create(state) {
        const {
            x, 
            y, 
            rows, 
            columns, 
            cellWidth, 
            cellHeight
        } = config.elements.bricks;
        
        state.bricks = new SpriteGrid(
            state.game, 
            x, 
            y, 
            rows, 
            columns, 
            cellWidth, 
            cellHeight,
            Brick
        );
        
        BrickKilled.subscribe( () => {
            if (state.bricks.countLiving() == 0) {
                state.bricks.callAll('revive');
                NextLevel.publish();
            }
        });
    }
}