import Phaser from '../helper/phaser-helper';
import config from '../config.js';

export default class Background extends Phaser.TileSprite {
    
    static get Image() { 
        return config.assets.background;
    }
    
    static Preload(state) {
        const {key, textureUrl} = Background.Image;
        state.game.load.image(key, textureUrl);
    }
    
    static Create(state) {
        new Background(state.game);
    }
    
    constructor(game, x, y) {
        if (game) {
            super(game, 0, 0, game.width, game.height, Background.Image.key);
            game.add.existing(this);   
        }
    }
}
