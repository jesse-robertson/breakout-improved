import jsdom from 'jsdom';
import Canvas from 'canvas';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

global.Canvas = Canvas;
global.Image = Canvas.Image;
global.window.CanvasRenderingContext2D = 'foo'; // let Phaser think that we have a canvas
global.window.Element = undefined;
global.navigator = {userAgent: 'Custom'}; // could be anything

// fake the xml http request object because Phaser.Loader uses it
global.XMLHttpRequest = function() {};

// Phaser Global Configuration
global.window.PhaserGlobal = global.window.PhaserGlobal || {};

// Hide Debug Banner
global.window.PhaserGlobal.hideBanner = true;

// load an expose PIXI in order to finally load Phaser
global.PIXI   = require('phaser/build/custom/pixi');
global.Phaser = require('phaser/build/custom/phaser-arcade-physics');