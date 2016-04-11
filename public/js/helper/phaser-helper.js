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
root.Phaser = require('phaser/build/custom/phaser-arcade-physics');

// Make Phaser loadable from module
export default root.Phaser;