import Phaser from '../../helper/phaser-helper';

/**
 * An invisible, collidable box.
 * 
 * @param {number} x X-coordinate
 * @param {number} y Y-coordinate
 * @param {number} w Width 
 * @param {number} h Height 
 */
export default class InvisibleBox extends Phaser.Sprite {
    constructor(game, x, y, width, height) {
        super(game, x, y);
        this.width = width;
        this.height = height;
        if (this.game) {
            this.game.physics.enable(this, Phaser.Physics.ARCADE);    
            if (this.body) {
                this.body.bounce.set(1);
                this.body.immovable = true;    
            }
        }
    }
}