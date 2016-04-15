import {distanceSquared} from '../math-helper';

/**
 * BrickTargeter
 * 
 * Breakout AI Targeting System
 */
export default class BrickTargeter {
    
    /**
     * Creates an instance of BrickTargeter
     * 
     * @constructor
     * @param {Phaser.Group} bricks
     * @param {Ball} ball
     */ 
    constructor(bricks, ball) {
        
        // Target Brick
        this.target = null;
        
        this.ball = ball;
        
        this.bricks = bricks || [];
    }
    
    /**
     * Among the remaining bricks, finds the brick that is farthest away
     * from the player ball.
     * 
     * This is not intended to be an efficient way to win the game, but 
     * rather a way to make the AI's play style resemble that of a human
     * 
     * This method is called again when the target brick 'dies'.
     */
    next() {
        let incumbent = {
            brick: null, 
            d2: 0
        };
        
        // Iterate through remaining bricks
        this.bricks.forEachAlive( brick => {
            const d2 = distanceSquared(brick, this.ball) || 0;
            const incumbentIsFartherAway = incumbent.d2 > d2;
            incumbent = incumbentIsFartherAway ? incumbent : {brick, d2};    
        });
        
        // Target is the final incumbent
        this.target = incumbent.brick;
        
        // If a target is found, have it invoke this function again on death
        if (this.target) {
            this.target.events.onKilled.add( () => {
                this.next();
            });
        }
    }
    
    
    getBrick() {
        if (!this.target) {
            this.next();
        }
        return this.target;
    }
}