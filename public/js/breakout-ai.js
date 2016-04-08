/**
 * Breakout Artificial Intelligence
 * 
 * Simulates a (skilled) human breakout player to facilitate multiplayer testing
 * 
 * Press any key during game to toggle Ai
 * 
 * @author Jesse Robertson <jesse.robertson@ou.edu>
 * @param {Phaser.Game} game
 * @param {Phaser.Group} bricks
 * @param {Phaser.Sprite} paddle
 * @param {Phaser.Sprite} ball
 */
export default function(game, bricks, paddle, ball) {
    
    /**
     * Ensures the given value is within a given radius of zero.
     * (Utility function) 
     * 
     * @param {number} x The given value
     * @param {number} r Desired radius
     * @returns {number} A value from the set {-r, x, +r}
     */
    var clamp = function(x, r) {
        return Math.max(-r, Math.min(x, r));
    };
    
    /**
     * Returns the AI targeting system -- a function that always returns the
     * AI player's next victim.
     * 
     * @returns {function} 
     */ 
    var getTargetingSystem = function() {
        
        // Target Brick
        var target;
        
        /**
         * Computes the squared distance (d^2) between the player ball and a
         * given brick.  Uses squared distance instead of distance because the
         * latter requires the computationally expensive Math.sqrt().
         * 
         * @param {Phaser.Sprite} brick
         * @returns {number} Squared distance from brick to ball
         */
        var getBallBrickDistanceSquared = function(brick) {
            if (!brick) return 0;
            var dx = brick.x - ball.x;
            var dy = brick.y - ball.y;
            return dx*dx + dy*dy;
        };
        
        /**
         * Generates a 'challenger' object from a brick.  A challenger object 
         * contains a brick and the squared distance from that brick to the
         * player ball.  The challenger object simplifies the 'getNextBrick()'
         * process.
         * 
         * @param {Phaser.Sprite} brick
         * @returns {object}
         */ 
        var brickToChallenger = function(brick) {
            return {
                brick: brick,
                distanceSquared: getBallBrickDistanceSquared(brick)
            };
        };
        
        /**
         * Among the remaining bricks, finds the brick that is farthest away
         * from the player ball.
         * 
         * This is not intended to be an efficient way to win the game, but 
         * rather a way to make the AI's play style resemble that of a human
         * 
         * This method is called again when the target brick 'dies'.
         */
        var getNextBrick = function() {
            var incumbent = brickToChallenger(null);
            
            // Iterate through remaining bricks
            bricks.forEachAlive(function(challengerBrick) {
                var challenger = brickToChallenger(challengerBrick);
                
                var incumbentIsFartherAway = incumbent.distanceSquared 
                                           > challenger.distanceSquared;
                
                incumbent = incumbentIsFartherAway ? incumbent : challenger;    
            });
            
            // Target is the final incumbent
            target = incumbent.brick;
            
            // If a target is found, have it invoke this function again on death
            if (target) target.events.onKilled.add(getNextBrick);
        };
        
        // Return a function that provides the current target brick
        return function() {
            if (!target) getNextBrick();
            
            return target;
        };
    };

    /**
     * Prevents game from pausing when focus leaves the game.  This is helpful 
     * when testing multiple users by activating the AI in multiple browser
     * windows.  
     * 
     * NOTE: Some browsers will still pause the game on minimize or tab change.
     */ 
    var preventGamePauseOnBlur = function() {
        game.stage.disableVisibilityChange = true;  
    };

    /**
     * Overrides user mouse input, allowing the AI to pretend to be human
     * 
     * @returns {object} Spoofed mouse.
     */
    var hijackMouseInput = function() {
        var Mouse = {};
        
        /**
         * Sets the getter for the mouse x position
         * 
         * @param {function} Mouse X position getter
         */
        Mouse.setGetterX = function(getter) {
            Object.defineProperty(game.input, 'x', { get : getter });  
        };
        
        /**
         * Fakes a mouse click
         */
        Mouse.click = function() {
            game.input.onDown.dispatch();    
        };
        
        return Mouse;
    };

    /**
     * Generates a function that accepts the target brick and returns the ideal 
     * paddle X position
     * 
     * @returns {function} brick-to-paddle-x-position function
     */
    var getPositioningSystem = function() {
        
        // Max offset = slightly less than half the paddle width
        var maxPaddleOffset = (0.9) * (0.5) * paddle.width;
        
        /**
         * Computes the ideal paddle position based on ball position and target
         * 
         * @param {Phaser.Sprite} brick Target Brick
         * @returns {number} ideal paddle X position.
         */
        return function(brick) {
            var dx = brick.x - ball.x,
                dy = brick.y - ball.y,
                vx = ball.body.velocity.y * dx / dy,
                paddleOffset = vx / 10;
                
            // Make sure the paddle doesn't miss the ball!
            return ball.x + clamp(paddleOffset, maxPaddleOffset);
        };
    };
    
    /**
     * Initializes Breakout AI
     */
    var init = function() {
        var getTargetPosition = getTargetingSystem(), 
            getPaddlePosition = getPositioningSystem(),
            mouse = hijackMouseInput();
        
        // By default, Phaser pauses the game on a blur event. This needs to be 
        // disabled to allow for multiple concurrent games (for testing).
        preventGamePauseOnBlur();
        
        // When the game asks for the user mouse x input...
        mouse.setGetterX(function() {
            
            // Automatically Release ball on start/restart
            var isBallWaitingOnPaddle = ( 0 === ball.body.velocity.y );
            if (isBallWaitingOnPaddle) {
                mouse.click();
            }
            
            // Grab position of current target
            var brick = getTargetPosition();
            
            // Compute optimal paddle position to hit target
            return getPaddlePosition(brick);
       });
    };
    
    // Initialize AI
    init();
}