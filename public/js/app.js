import Phaser from './helper/phaser-helper.js';
import createGameWalls   from './create-game-walls.js';
import PseudoMultiplayer from './pseudo-multiplayer.js';
import BreakoutAi        from './breakout-ai.js';

//import BreakoutGame from './model/breakout-game.js';

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-root', {
    preload: preload, 
    create: create,
    update: update
});

function preload() {
    game.load.atlas(
        'breakout',
        'img/breakout-spritemap.png',
        'img/breakout-spritemap.json'
    );
    game.load.image(
        'starfield',
        'img/starfield-background.jpg'
    );
    game.load.atlas(
        'kitty', 
        'img/dancing-cat.png', 
        'img/dancing-cat-spritemap.json'
    );
}

//var walls;
var ballManager;
var ball;
var kitty;
var paddle;
var bricks;

var ballOnPaddle = true;

var lives = 3;
var score = 0;

var scoreText;
var livesText;
var introText;

var s;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    // DEPRECATED // game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, 800, 600, 'starfield');


    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    var brick;

    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 15; x++) {
            brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y + 1) + '_1.png');
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
    }

    paddle = game.add.sprite(game.world.centerX, 500, 'breakout', 'paddle_big.png');
    paddle.anchor.setTo(0.5, 0.5);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

    ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'breakout', 'ball_1.png');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    // Prevent default world bound collisions
    ball.body.collideWorldBounds = false;
    ball.body.bounce.set(1);

    


    ball.animations.add('spin', ['ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png'], 50, true, false);

    ball.events.onOutOfBounds.add(ballLost, this);


    kitty = game.add.sprite(0,0,'kitty','cat1.png');
    kitty.animations.add('dance', ['cat1.png','cat2.png','cat3.png','cat4.png','cat5.png','cat6.png','cat7.png','cat8.png'], 8, true, false);
    

    scoreText = game.add.text(32, 550, 'score: 0', {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
    });
    livesText = game.add.text(680, 550, 'lives: 3', {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
    });
    introText = game.add.text(game.world.centerX, 400, '- click to start -', {
        font: "40px Arial",
        fill: "#ffffff",
        align: "center"
    });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(releaseBall, this);

    // Create game walls
    var walls = createGameWalls(game);

    // Create ball manager and define ball collisions
    ballManager = new PseudoMultiplayer.BallManager(game, ball)
        .addCollision(bricks, ballHitBrick)
        .addCollision(paddle, ballHitPaddle)
        .addCollision(walls);
}

function update() {

    
    //  Fun, but a little sea-sick inducing :) Uncomment if you like!
    //s.tilePosition.x += (game.input.speed.x / 2);

    paddle.x = game.input.x;

    if (paddle.x < 24) {
        paddle.x = 24;
    }
    else if (paddle.x > game.width - 24) {
        paddle.x = game.width - 24;
    }

    if (ballOnPaddle) {
        ball.body.x = paddle.x;
    }
    else {
        // Have ball manager check player ball collisions
        ballManager.checkCollisions();
    }

}

function releaseBall() {

    if (ballOnPaddle) {
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
        ball.animations.play('spin');
        kitty.animations.play('dance');
        introText.visible = false;
    }

}

function ballLost() {

    lives--;
    livesText.text = 'lives: ' + lives;

    if (lives === 0) {
        gameOver();
    }
    else {
        ballOnPaddle = true;

        ball.reset(paddle.body.x + 16, paddle.y - 16);

        ball.animations.stop();
        kitty.animations.stop();
    }

}

function gameOver() {

    ball.body.velocity.setTo(0, 0);

    introText.text = 'Game Over!';
    introText.visible = true;

}

function ballHitBrick(_ball, _brick) {

    _brick.kill();

    score += 10;

    scoreText.text = 'score: ' + score;

    //  Are they any bricks left?
    if (bricks.countLiving() == 0) {
        //  New level starts
        score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';

        //  Let's move the ball back to the paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();
        kitty.animations.stop();

        //  And bring the bricks back from the dead :)
        bricks.callAll('revive');
    }

}

function ballHitPaddle(_ball, _paddle) {

    var diff = 0;

    if (_ball.x < _paddle.x) {
        //  Ball is on the left-hand side of the paddle
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _paddle.x) {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x - _paddle.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }
}


// Invoke the AI when a key is pressed
var aiEnabled = false;
document.onkeyup = function() {
    if (aiEnabled) return;
    aiEnabled = true;
    BreakoutAi(game, bricks, paddle, ball);
};