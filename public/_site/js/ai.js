var BreakOutAi = BreakOutAi || function(game, bricks, paddle, ball) {
    var getTargetingSystem = function() {
        var target;
       
        var getBallBrickDistanceSquared = function(brick) {
            if (!brick) return 0;
            var dx = brick.x - ball.x;
            var dy = brick.y - ball.y;
            return dx*dx + dy*dy;
        };
        
        var brickToChallenger = function(brick) {
            return {
                brick: brick,
                distanceSquared: getBallBrickDistanceSquared(brick)
            };
        };
        
        var getNextBrick = function() {
            var incumbent = brickToChallenger(null);
            bricks.forEachAlive(function(challengerBrick) {
                var challenger = brickToChallenger(challengerBrick);
                
                var incumbentIsFartherAway = incumbent.distanceSquared 
                                           > challenger.distanceSquared;
                
                incumbent = incumbentIsFartherAway ? incumbent : challenger;    
            });
            target = incumbent.brick;
            
            if (target) target.events.onKilled.add(getNextBrick);
        };
        
        return function() {
            if (!target) getNextBrick();
            
            return target;
        };
    };

    var getPositioningSystem = function() {
    
        // Max offset = slightly less than half the paddle width
        var maxPaddleOffset = (0.99) * (0.5) * paddle.width;
        
        var clampPaddleOffset = function(offset) {
            var absOffset = Math.abs(offset);
            
            var isWithinPaddle = absOffset < maxPaddleOffset;
            
            if (isWithinPaddle) return offset;
            
            var sign = offset/absOffset;
                
            return sign * maxPaddleOffset;
        };
        
        return function(brick) {
            var dx = brick.x - ball.x,
                dy = brick.y - ball.y,
                vx = ball.body.velocity.y * dx / dy,
                paddleOffset = vx / 10;
            return ball.x + clampPaddleOffset(paddleOffset);
        };
    };
    
    var preventGamePauseOnBlur = function() {
        game.stage.disableVisibilityChange = true;  
    };
    
    var hijackMouseInput = function() {
        var Mouse = {};
        
        Mouse.setGetterX = function(getter) {
            Object.defineProperty(game.input, 'x', { get : getter });  
        };
        
        Mouse.click = function() {
            game.input.onDown.dispatch();    
        };
        
        return Mouse;
    };
    
    var init = function() {
        var getTargetPosition = getTargetingSystem(), 
            getPaddlePosition = getPositioningSystem(),
            mouse = hijackMouseInput();
        
        // By default, Phaser pauses the game on a blur event
        // This needs to be disabled
        preventGamePauseOnBlur();
        
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
    
    init();
};

$(document).keyup(function() {
    BreakOutAi(game, bricks, paddle, ball);
});