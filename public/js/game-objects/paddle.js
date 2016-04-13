import Phaser          from '../helper/phaser-helper';
import {getSafeMouseX} from '../helper/input-helper';
import config          from '../config.js';

export default class Paddle extends Phaser.Sprite {
    
    static get Image() {  return config.assets.mainAtlas; }
    
    static Preload(state) {
        const {key, textureUrl, atlasUrl} = Paddle.Image;
        state.game.load.atlas(key, textureUrl, atlasUrl);
    }
    
    static Create(state) {
        const x = state.game.world.centerX;
        const y = 500;
        state.paddle = new Paddle(state.game, x, y);
    }
    
    constructor(game, x = 0, y = 0) {
        super(game, x, y, Paddle.Image.key, 'paddle_big.png');
        
        if (this.game) {
            this.game.add.existing(this);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            if (this.body) {
                this.body.collideWorldBounds = true;
                this.body.bounce.set(1);
                this.body.immovable = true;        
            }
        }
        this.anchor.setTo(0.5, 0.5);
    }
    
    update() {
        this.x = getSafeMouseX(this.game);
    }
}