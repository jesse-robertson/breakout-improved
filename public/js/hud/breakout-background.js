import Phaser from '../helper/phaser-helper';
import config from '../config.js';

export default class BreakoutBackground extends Phaser.TileSprite {
    
    static get Image() { 
        return config.assets.background;
    }
    
    static Preload(game) {
        const {key, textureUrl} = BreakoutBackground.Image;
        game.load.image(key, textureUrl);
    }
    
    constructor(game, x, y) {
        if (game) {
            super(game, 0, 0, game.width, game.height, BreakoutBackground.Image.key);
            game.add.existing(this);   
        }
    }
}
