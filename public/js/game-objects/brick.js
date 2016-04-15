import Phaser from '../helper/phaser-helper';
import config from '../config.js';
import {
    BallHitBrick,
    BrickKilled
} from '../core/events';


export default class Brick extends Phaser.Sprite {
    
    static get Image() {  return config.assets.mainAtlas; }
    
    static Preload(state) {
        const {key, textureUrl, atlasUrl} = Brick.Image;
        state.game.load.atlas(key, textureUrl, atlasUrl);
    }
    
    static FrameMap(i,j) {
        return `brick_${j + 1}_1.png`;
    }
    
    constructor(game, x, y, frame) {
        super(game, x, y, Brick.Image.key, frame);
        if (this.game) {
            this.game.physics.enable(this, Phaser.Physics.ARCADE);    
            if (this.body) {
                this.body.bounce.set(1);
                this.body.immovable = true;    
            }
        }
        
        BallHitBrick.subscribe( (ball, brick) => {
            if (brick === this) {
                this.kill();
                BrickKilled.publish(this);
            }
        });
        
    }
}