import Physics     from './physics';
import Hud         from '../hud/';
import GameObjects from '../game-objects/';
import Ai          from '../helper/ai';

export default [ 
    Physics, 
    ...Hud, 
    ...GameObjects,  
    Ai 
];