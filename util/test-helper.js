import './mock-dom-canvas.js';

// The Phaser debug banner (console log) makes it hard to read the test 
// printouts, so we'll disable it when we're just running tests.
window.PhaserGlobal = window.PhaserGlobal || {};
window.PhaserGlobal.hideBanner = true;