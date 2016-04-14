import Phaser     from '../helper/phaser-helper';
import Components from './components';
import {
    invokeAll, 
    gather
} from '../helper/math-helper.js';

export default class BreakoutState extends Phaser.State {

    constructor(game) {
        super(game);
        
        // Gather Preload/Create/Update static methods from game components
        this.preloads = gather(Components, 'Preload');
        this.creators = gather(Components, 'Create');
        this.updaters = gather(Components, 'Update');
    }
  
    /**
     * Delegate preload, create, and update responsibilities to game components
     */ 
    preload() { return invokeAll(this.preloads, this) }
    create()  { return invokeAll(this.creators, this) }
    update()  { return invokeAll(this.updaters, this) }
}
