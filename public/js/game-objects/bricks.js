import SpriteGrid from './base/sprite-grid';
import Brick      from './brick';
import config     from '../config';

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
    }
}