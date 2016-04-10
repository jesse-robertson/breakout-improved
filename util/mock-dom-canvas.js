import jsdom from 'jsdom';
import Canvas from 'canvas';

const doc = jsdom.jsdom(`
  <!doctype html>
  <html>
    <body>
    </body>
  </html>
`);

const win = doc.defaultView;

global.document = doc;
global.window = win;
global.Canvas = Canvas;
global.Image = Canvas.Image;
global.window.CanvasRenderingContext2D = 'foo'; // let Phaser think that we have a canvas
global.window.Element = undefined;
global.navigator = {userAgent: 'Custom'}; // could be anything

// fake the xml http request object because Phaser.Loader uses it
global.XMLHttpRequest = function() {};

// Object.keys(window).forEach( key => {
//   if (!(key in global)) {
//     global[key] = window[key];
//   }
// });