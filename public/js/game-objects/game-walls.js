import Phaser       from '../helper/phaser-helper';
import InvisibleBox from './base/invisible-box';

export default class GameWalls extends Phaser.Group{
    
    /**
     * Creates up left, right, and top game walls 
     * in order to capture ball bounce events.
     * 
     * @author Jesse Robertson <jesse.robertson@ou.edu>
     */
    static Create(state) {
        const top    = true;
        const right  = true;
        const bottom = false;
        const left   = true;
        state.walls = new GameWalls(state.game, top, right, bottom, left);
    }
    
    constructor(game, top = true, right = true, bottom = true, left = true) {
        super(game);
        
        let walls = [];
        
        if (top) walls.push(this.createTop());
        if (right) walls.push(this.createRight());
        if (bottom) walls.push(this.createBottom());
        if (left) walls.push(this.createLeft());
        
        this.addMultiple(walls);
    }
    
    createTop() {
        const topY = 0;
        return this.createHorizontal(topY);
    }
    
    createRight() {
        const rightX = this.game.world.width;
        return this.createVertical(rightX);
    }
    
    createBottom() {
        const bottomY = this.game.world.height;
        return this.createHorizontal(bottomY);
    }
    
    createLeft() {
        const leftX = 0;
        return this.createVertical(leftX);
    }
    
    createHorizontal(y) {
        return new InvisibleBox(this.game, 0, y, this.game.world.width, 1);
    }
    
    createVertical(x) {
        return new InvisibleBox(this.game, x, 0, 1, this.game.world.height);
    }
}