/** 
 * createGameWalls()
 * 
 * Creates up left, right, and top game walls 
 * in order to capture ball bounce events.
 * 
 * @author Jesse Robertson <jesse.robertson@ou.edu>
 * @param {Phaser.Game} game
 * @returns {Phaser.Group} A group of wall sprites
 */
var createGameWalls = createGameWalls || function(game) {
    
    // Create sprite group to hold the game wall sprites
    var walls = game.add.group();
    
    // Enable arcade physics bodies for each sprite added to the group
    walls.enableBody = true;
    walls.physicsBodyType = game.world.physicsBodyType;
    
    /**
     * Adds an invisible, collidable game wall.
     * 
     * @param {number} x X-coordinate of wall sprite 
     * @param {number} y Y-coordinate of wall sprite
     * @param {number} w Wall width 
     * @param {number} h Wall height 
     */
    var createGameWall = function(x, y, w, h) {
        
        // Define bounding box for invisible wall
        var wall = walls.create(x, y);
        wall.height = h;
        wall.width = w;
        
        // Perfecly elastic collisions
        wall.body.bounce.set(1);
        wall.body.immovable = true;
    };
    
    /**
     * Adds a horizontal, invisible, collidable game wall at the given y
     * coordinate with unit thickness and which spans the world width
     *  
     * @param {number} y Y-coordinate of horizontal wall
     */
    var createHorizontalGameWall = function(y) {
        createGameWall(0,y,game.world.width,1);
    };
    
    /**
     * Adds a vertical, invisible, collidable game wall at the given x
     * coordinate with unit thickness and which spans the world height
     *  
     * @param {number} x X-coordinate of vertical wall
     */
    var createVerticalGameWall = function(x) {
        createGameWall(x,0,1,game.world.height);
    };
    
    // Top Wall
    var worldTop = 0;
    createHorizontalGameWall(worldTop);
    
    // Left Wall
    var worldLeft = 0;
    createVerticalGameWall(worldLeft);
    
    // Right Wall
    var worldRight = game.world.width;
    createVerticalGameWall(worldRight);
    
    return walls;
};
