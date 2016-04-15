import Ball from './base/ball'; 
import {getSafeMouseX} from '../helper/input-helper';
import {
    BallHitPaddle, 
    GameOver,
    BallReleased,
    RestartBall,
    BallLost,
    NextLevel
} from '../core/events';

export default class PlayerBall extends Ball {
    
    static Preload(state) {
        super.Preload(state);
    }
    
    static Create(state) {
        const y = 484;
        const x = state.game.world.centerX;
        state.ball = new PlayerBall(state.game, x, y);
    }
    
    constructor(game, x, y) {
        super(game, x, y);
        this.startX = x;
        this.startY = y;
        this.isOnPaddle = true;
        
        BallHitPaddle.subscribe( (ball, paddle) => { this.hitPaddle(paddle); });
        GameOver.subscribe( () => { this.onGameOver(); });
        RestartBall.subscribe( () => { this.restart(); });
        NextLevel.subscribe( () => { this.restart(); });
        
        this.game.input.onDown.add( () => { this.release(); });
        this.events.onOutOfBounds.add(BallLost.publish);
    }
    
    update() {
        if (this.isOnPaddle) {
            this.body.x = getSafeMouseX(this.game);
        } 
    }
    
    restart() {
        this.isOnPaddle = true;
        this.reset(this.startX, this.startY);
        this.animations.stop();
    }
    
    release() {
        if (!this.isOnPaddle) return;
        
        this.isOnPaddle = false;
        this.body.velocity.y = -300;
        this.body.velocity.x = -75;
        this.animations.play('spin');
        
        BallReleased.publish(this);
    }
    
    onGameOver() {
        this.body.velocity.setTo(0, 0);   
    }
    
    hitPaddle(paddle) {
        var diff = this.x - paddle.x;
        
        if (0 === diff) {
            diff = Math.Random() - 0.5;
        }
    
        this.body.velocity.x = 10 * diff;
    }
}