import Phaser from './phaser-helper';

/**
 * Wraps Phaser's 'Signal' system as pub/sub 
 */
export function makeEvent() {
    const signal = new Phaser.Signal();
    
    const subscribe = callback => {
        signal.add(callback);
    };
    
    const publish = (...args) => {
        signal.dispatch(...args);
    };
    
    return {publish, subscribe};
}