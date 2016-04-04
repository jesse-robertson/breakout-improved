
var PseudoMultiplayer = PseudoMultiplayer || (function() {
    
    var BallManager = function(game, ball) {
        this.game = game;
        this.collisionChecker = function(){};
        this.ball = ball;
        this.collisions = [];
    };
    
    
    BallManager.prototype.addCollision = function(entity, callback) {
        this.collisions.push({
            entity   : entity,
            callback : callback
        });
        return this;
    };
    
    BallManager.prototype.sendState = function() {
        console.log('boing',this.ball.x,this.ball.y, this.ball.body.velocity.x, this.ball.body.velocity.y);
    };
    
    BallManager.prototype.setCollisionChecker = function(checker) {
        this.collisionChecker = checker;
        return this;
    };
    
    BallManager.prototype.checkCollisions = function() {
        this.collisions.forEach(this.checkCollision, this);
        return this;
    };
    
    BallManager.prototype.checkCollision = function(collision) {
        this.game.physics.arcade.collide(
            this.ball, 
            collision.entity, 
            this.wrapCollideCallback(collision.callback)
        );  
    };
    
    BallManager.prototype.wrapCollideCallback = function(collisionCallback) {
        var _this = this;
        return function() {
            if (collisionCallback) {
                collisionCallback.apply(this, arguments);
            }
            _this.sendState();
        };
    };
    
    return {
        BallManager:BallManager
    };
    
})();





// setTimeout(function() {
    
    
    
    
//     var reportNewVelocity = function(x, y) {
//         console.log(x,y);
//     };
    
//     var velocityChangeX = function(x) {
//         console.log('xvelchange');
//         reportNewVelocity(x, ball.body.velocity.y);
//     }
    
//     var velocityChangeY = function(y) {
//         console.log('yvelchange');
//         reportNewVelocity(ball.body.velocity.x, y);
//     }
    
    
//     Object.defineProperties(ball.body.velocity, {
//         x: { set : velocityChangeX },
//         y: { set : velocityChangeY }
//     });
// },5000);