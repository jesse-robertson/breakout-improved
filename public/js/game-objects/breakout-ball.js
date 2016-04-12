import Phaser from '../helper/phaser-helper';
import config from '../config.js';

export default class BreakoutBall extends Phaser.Sprite {
    
    static get Image() { 
        return config.assets.mainAtlas;
    }
    
    static Preload(game) {
        const {key, textureUrl, atlasUrl} = BreakoutBall.Image;
        game.load.atlas(key, textureUrl, atlasUrl);
    }
    
    constructor(game, x, y) {
        super(game, x, y, BreakoutBall.Image.key, 'ball_1.png');
        
        if (this.game) {
            this.game.add.existing(this);   
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            if (this.body) {
                this.body.collideWorldBounds = false;
                this.body.bounce.set(1);
            }
        }
        this.anchor.set(0.5);
        this.checkWorldBounds = true;
        this.addAnimations();
    }
    
    addAnimations() {
        this.defineAnimations().forEach( animation => {
            const {name, frames, frameRate, loop, useNumericIndex} = animation;
            this.animations.add(name, frames, frameRate, loop, useNumericIndex);
        });
    }
    
    defineAnimations() {
        return [
            this.defineSpinAnimation() 
        ];
    }
    
    defineSpinAnimation() {
        return {
            name: 'spin',
            loop: true,
            frameRate: 50,
            frames: [
                'ball_1.png', 
                'ball_2.png', 
                'ball_3.png', 
                'ball_4.png', 
                'ball_5.png'
            ],
            useNumericIndex: false
        };   
    }
}