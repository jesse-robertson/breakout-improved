import config  from '../config';
import {clamp} from './math-helper'; 

/**
 * Clamps the mouse x value to stay within the 'safe' region
 */
export function getSafeMouseX(game) {
    const buffer = config.controls.mouse.edgeBuffer.x;
    return clamp(game.input.x, buffer, game.width - buffer);
}


export function botMouse(input) {
    const botMouse = {};
        
    /**
     * Sets the getter for the mouse x position
     * 
     * @param {function} Mouse X position getter
     */
    botMouse.setGetterX = function(getter) {
        Object.defineProperty(input, 'x', { 
            get: () => {
                // Pass botMouse to custom getter
                return getter(botMouse);
            }
        });  
    };
    
    /**
     * Fakes a mouse click
     */
    botMouse.click = function() {
        input.onDown.dispatch();    
    };
    
    return botMouse;    
}