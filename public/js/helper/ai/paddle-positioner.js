import {clamp} from '../math-helper';

/**
 * Generates a function that accepts the target brick and returns the ideal 
 * paddle X position
 */
export default class PaddlePositioner {
 
    constructor(paddle, ball) {
        this.maxPaddleOffset = (0.9) * (0.5) * paddle.width;
        this.ball = ball;
    }
    
    /**
     * Computes the ideal paddle position based on ball position and target
     * 
     * @param {Phaser.Sprite} brick Target Brick
     * @returns {number} ideal paddle X position.
     */
    getPaddleX(brick) {
        const dx = brick.x - this.ball.x;
        const dy = brick.y - this.ball.y;
        const vx = this.ball.body.velocity.y * dx / dy;
        const paddleOffset = vx / 10;
            
        // Make sure the paddle doesn't miss the ball!
        return this.ball.x + clamp(paddleOffset, this.maxPaddleOffset);
    }
}