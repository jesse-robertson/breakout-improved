import Phaser            from '../helper/phaser-helper';
import createGameWalls   from '../create-game-walls.js';
import PseudoMultiplayer from '../pseudo-multiplayer.js';
import BreakoutAi        from '../breakout-ai.js';

export default class BreakoutState extends Phaser.State {
    
    preload() {
        this.game.load.atlas(
            'breakout',
            'img/breakout-spritemap.png',
            'img/breakout-spritemap.json'
        );
        this.game.load.image(
            'starfield',
            'img/starfield-background.jpg'
        );
    }
    
    create() {
        this.ballOnPaddle = true;
        this.lives = 3;
        this.score = 0;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
        this.game.add.tileSprite(0, 0, 800, 600, 'starfield');
    
        this.bricks = this.game.add.group();
        this.bricks.enableBody = true;
        this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
    
        var brick;
    
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 15; x++) {
                brick = this.bricks.create(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y + 1) + '_1.png');
                brick.body.bounce.set(1);
                brick.body.immovable = true;
            }
        }
    
        this.paddle = this.game.add.sprite(this.game.world.centerX, 500, 'breakout', 'paddle_big.png');
        this.paddle.anchor.setTo(0.5, 0.5);
    
        this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
    
        this.paddle.body.collideWorldBounds = true;
        this.paddle.body.bounce.set(1);
        this.paddle.body.immovable = true;
    
        this.ball = this.game.add.sprite(this.game.world.centerX, this.paddle.y - 16, 'breakout', 'ball_1.png');
        this.ball.anchor.set(0.5);
        this.ball.checkWorldBounds = true;
    
        this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    
        // Prevent default world bound collisions
        this.ball.body.collideWorldBounds = false;
        this.ball.body.bounce.set(1);
    
        this.ball.animations.add('spin', ['ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png'], 50, true, false);
    
        this.ball.events.onOutOfBounds.add( () => {
            this.lives--;
            this.livesText.text = 'lives: ' + this.lives;
        
            if (this.lives === 0) {
                this.ball.body.velocity.setTo(0, 0);
                this.introText.text = 'Game Over!';
                this.introText.visible = true;
            } else {
                this.ballOnPaddle = true;
                this.ball.reset(this.paddle.body.x + 16, this.paddle.y - 16);
                this.ball.animations.stop();
            }
        });
    
        this.scoreText = this.game.add.text(32, 550, 'score: 0', {
            font: "20px Arial",
            fill: "#ffffff",
            align: "left"
        });
        this.livesText = this.game.add.text(680, 550, 'lives: 3', {
            font: "20px Arial",
            fill: "#ffffff",
            align: "left"
        });
        this.introText = this.game.add.text(this.game.world.centerX, 400, '- click to start -', {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        });
        this.introText.anchor.setTo(0.5, 0.5);
    
        this.game.input.onDown.add( () => {
            if (this.ballOnPaddle) {
                this.ballOnPaddle = false;
                this.ball.body.velocity.y = -300;
                this.ball.body.velocity.x = -75;
                this.ball.animations.play('spin');
                this.introText.visible = false;
            }
        });
    
        // Create game walls
        var walls = createGameWalls(this.game);
    
        // Create ball manager and define ball collisions
        this.ballManager = new PseudoMultiplayer.BallManager(this.game, this.ball)
            .addCollision(this.bricks, (ball, brick) => {
                brick.kill();
            
                this.score += 10;
            
                this.scoreText.text = 'score: ' + this.score;
            
                //  Are they any bricks left?
                if (this.bricks.countLiving() == 0) {
                    //  New level starts
                    this.score += 1000;
                    this.scoreText.text = 'score: ' + this.score;
                    this.introText.text = '- Next Level -';
            
                    //  Let's move the ball back to the paddle
                    this.ballOnPaddle = true;
                    this.ball.body.velocity.set(0);
                    this.ball.x = this.paddle.x + 16;
                    this.ball.y = this.paddle.y - 16;
                    this.ball.animations.stop();
            
                    //  And bring the bricks back from the dead :)
                    this.bricks.callAll('revive');
                }
            })
            .addCollision(this.paddle, (ball, paddle) => {
                var diff = 0;
            
                if (this.ball.x < this.paddle.x) {
                    //  Ball is on the left-hand side of the paddle
                    diff = this.paddle.x - this.ball.x;
                    this.ball.body.velocity.x = (-10 * diff);
                }
                else if (this.ball.x > this.paddle.x) {
                    //  Ball is on the right-hand side of the paddle
                    diff = this.ball.x - this.paddle.x;
                    this.ball.body.velocity.x = (10 * diff);
                }
                else {
                    //  Ball is perfectly in the middle
                    //  Add a little random X to stop it bouncing straight up!
                    this.ball.body.velocity.x = 2 + Math.random() * 8;
                }
            })
            .addCollision(walls);
            
        // Invoke the AI when a key is pressed
        var aiEnabled = false;
        this.game.input.keyboard.addCallbacks(null, null, null, () => {
            if (aiEnabled) return;
            aiEnabled = true;
            BreakoutAi(this.game, this.bricks, this.paddle, this.ball);
        });  
    }
    
    update() {
        this.paddle.x = this.game.input.x;
    
        if (this.paddle.x < 24) {
            this.paddle.x = 24;
        }
        else if (this.paddle.x > this.game.width - 24) {
            this.paddle.x = this.game.width - 24;
        }
    
        if (this.ballOnPaddle) {
            this.ball.body.x = this.paddle.x;
        }
        else {
            // Have ball manager check player ball collisions
            this.ballManager.checkCollisions();
        }
    }
}
