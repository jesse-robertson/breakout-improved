import Phaser from '../helper/phaser-helper';

export default class BreakoutBall extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'breakout', 'ball_1.png');
        if (this.game) {
            this.game.add.existing(this);   
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
        }
        
        if (this.body) {
            this.body.collideWorldBounds = false;
            this.body.bounce.set(1);
        }
        
        this.anchor.set(0.5);
        this.checkWorldBounds = true;
        
        
        // Configure Spin Animation
        const spinAnimationName = 'spin';
        const spinAnimationIsLooped = true;
        const spinAnimationFps = 50;
        const spinAnimationFrames = [
            'ball_1.png', 
            'ball_2.png', 
            'ball_3.png', 
            'ball_4.png', 
            'ball_5.png'
        ];
        this.animations.add(
            spinAnimationName, 
            spinAnimationFrames, 
            spinAnimationFps, 
            spinAnimationIsLooped
        );
        
    }
}