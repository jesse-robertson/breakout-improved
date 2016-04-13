import StubPhaserGameObjectFactory from './stub-phaser-game-object-factory';
import StubPhaserPhysics           from './stub-phaser-physics';
import StubPhaserLoader            from './stub-phaser-loader';
import StubPhaserCache             from './stub-phaser-cache';
import StubPhaserInput             from './stub-phaser-input';

export default () => ({
    add     : StubPhaserGameObjectFactory(),
    physics : StubPhaserPhysics(),
    load    : StubPhaserLoader(),
    cache   : StubPhaserCache(),
    input   : StubPhaserInput(),
    onPause: {
        add: () => {}
    },
    onResume: {
        add: () => {}
    },
    world:{
        addChild: () => {},
        children: []
    },
    renderer:{}
});