import config  from '../config';
import {clamp} from './math-helper'; 

/**
 * Clamps the mouse x value to stay within the 'safe' region
 */
export function getSafeMouseX(game) {
    const buffer = config.controls.mouse.edgeBuffer.x;
    return clamp(game.input.x, buffer, game.width - buffer);
}