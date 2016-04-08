import io from 'socket.io-client';

/**
 * Pseudo-Multiplayer Module
 * 
 * Defines BallManager class, which handles the syncronization of player ball
 * states and the lifecycle of other player's 'ghost' balls.
 * 
 * @author Jesse Robertson <jesse.robertson@ou.edu>
 * @param io Socket.io library object
 */
var PseudoMultiplayer = PseudoMultiplayer || (function(io) {
    
    // Define socket event constants
    var BOUNCE_EVENT = 'boing',
        LOSS_EVENT   = 'lost-ball';
    
    /**
     * Creates a BallManager instance
     * 
     * @constructor
     * @this {BallManager}
     * @param game {Phaser.Game}
     * @param ball {Phaser.Sprite} The player's ball 
     */
    var BallManager = function(game, ball) {
        
        // Set constructor values
        this.game = game;
        this.ball = ball;
        
        // Initialize manager collections
        this.collisions = [];
        this.ghosts = {};
        
        // Initiate socket syncronization
        this.initializeSocket();
    };
    
    /**
     * Opens socket.io communications and defines callbacks
     * 
     * @this {BallManager}
     */
    BallManager.prototype.initializeSocket = function() {
        
        // Open socket.io connection; force websockets by default
        this.socket = io({
            transports: ['websocket'] 
        });
        
        // On incoming bounce event, update the indicated ghost ball
        this.socket.on(BOUNCE_EVENT, data => 
            this.updateGhost(data.id, data.position, data.velocity)
        );
        
        // On incoming loss event, destroy the indicated ghost ball
        this.socket.on(LOSS_EVENT, data => 
            this.destroyGhost(data.id)
        );
    };
    
    /**
     * Destroys the indicated ghost ball sprite.
     * 
     * @param {string} id Unique ghost ball identifier
     * @this {BallManager}
     */
    BallManager.prototype.destroyGhost = function(id) {
        
        var ghost = this.ghosts[id];
        
        // Ignore if invalid id
        if (!ghost) return;
        
        // Remove from game
        this.ghosts[id].destroy();
        
        // Remove from hash
        delete this.ghosts[id];
    };
    
    /**
     * Fetches or creates the indicated ghost ball
     * 
     * @param {string} id Unique ghost ball identifier
     * @this {BallManager}
     * @returns {Phaser.Sprite} Requested or created ghost ball
     */
    BallManager.prototype.getGhost = function(id) {
        return this.ghosts[id] ? this.ghosts[id] : this.createGhost(id);
    };
    
    /**
     * Updates the indicated ghost ball's position and velocity
     * 
     * @param {string} id Unique ghost ball identifier
     * @param {object} position New position ghost ball 
     * @param {object} velocity New velocity ghost ball 
     * @this  {BallManager}
     */
    BallManager.prototype.updateGhost = function(id, position, velocity) {
        var ghost = this.getGhost(id);
        ghost.x = position.x;
        ghost.y = position.y;
        ghost.body.velocity.x = velocity.x;
        ghost.body.velocity.y = velocity.y;
    };
    
    /**
     * Creates a new ghost ball to represent another player
     * 
     * @param {string} id Unique ghost ball identifier
     * @this {BallManager}
     * @returns {Phaser.Sprite} A new ghost ball
     */
    BallManager.prototype.createGhost = function(id) {
        
        // Skip if already exists
        if (!this.ghosts[id]) {
            
            // Use same settings as player ball. Consider inheritance for future versions
            var ghost = this.game.add.sprite(0, 0, 'breakout', 'ball_1.png');
            ghost.anchor.set(0.5);
            this.game.physics.enable(ghost, this.game.world.physicsBodyType);
            ghost.body.collideWorldBounds = false;
            ghost.body.bounce.set(1);
            ghost.animations.add('spin', [
                'ball_1.png', 
                'ball_2.png', 
                'ball_3.png', 
                'ball_4.png', 
                'ball_5.png' 
            ], 50, true, false);
            ghost.animations.play('spin');
            
            // Make ghost balls mostly transparent
            ghost.alpha = 0.33;
            
            // Add to hash
            this.ghosts[id] = ghost;      
        }
        return this.ghosts[id];
    };

    /**
     * Register an object/callback pair for collisons with player ball
     * 
     * @param {object} entity Object or group of objects for which to check 
     *                 collisions with the player ball.
     * @param {function} callback Function to evoke when a collision occurs
     * @this {BallManager}
     * @returns {BallManager} 
     */
    BallManager.prototype.addCollision = function(entity, callback) {
        this.collisions.push({
            entity   : entity,
            callback : callback
        });
        return this;
    };
    
    /**
     * Sends player ball state over the socket
     * 
     * @this {BallManager}
     */
    BallManager.prototype.sendState = function() {
        this.socket.emit(BOUNCE_EVENT, {
            position: { 
                x: this.ball.x, 
                y: this.ball.y
            },
            velocity: { 
                x: this.ball.body.velocity.x, 
                y: this.ball.body.velocity.y
            }
        });
    };
    
    /**
     * Check all registered collisions.  This should be called in the game
     * update() method.
     * 
     * @this {BallManager}
     * @returns {BallManager}
     */
    BallManager.prototype.checkCollisions = function() {
        this.collisions.forEach(this.checkCollision, this);
        return this;
    };
    
    /**
     * Check a registered collision and wrap the provided callback
     * 
     * @param {object} collision A registered object/callback collision pair
     * @this {BallManager}
     */
    BallManager.prototype.checkCollision = function(collision) {
        this.game.physics.arcade.collide(
            this.ball, 
            collision.entity, 
            this.wrapCollisionCallback(collision.callback)
        );  
    };
    
    /**
     * Transmit the updated player ball state on collision
     * 
     * @param {function} collisionCallback
     * @this {BallManager}
     * @returns {function}
     */
    BallManager.prototype.wrapCollisionCallback = function(collisionCallback) {
        var _this = this;
        
        // Return a wrapped function
        return function() {
            
            // Check for callback
            if (collisionCallback) {
                
                // It is likely that the collision callback will alter the
                // position or velocity of the player ball, so invoke the 
                // callback before transmitting the new state
                collisionCallback.apply(this, arguments);
            }
            
            // Transmit player ball state
            _this.sendState();
        };
    };
    
    // Expose the BallManager class
    return { BallManager:BallManager };
})(io);


export default PseudoMultiplayer;