/**
 * Phaser Helper Module
 * 
 * Phaser is not designed to be accessed via 'require' or 'import'. This wrapper
 * corrects this.
 * 
 * @param {object} globalConfig Phaser global settings
 */
 
// Node/Browser Isomorphism
var root = global || window;

// Load and expose PIXI
root.PIXI = require('phaser/build/custom/pixi');

// Load and expose Phaser
export default require('phaser/build/custom/phaser-arcade-physics');