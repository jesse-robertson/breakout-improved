//import Phaser from '../helper/phaser-helper';
import config from '../config.js';

export default class Brick {
    
    static get Image() { 
        return config.assets.mainAtlas;
    }
    
    static Preload(state) {
        const {key, textureUrl, atlasUrl} = Brick.Image;
        state.game.load.atlas(key, textureUrl, atlasUrl);
    }
    
    static Create() {}
}