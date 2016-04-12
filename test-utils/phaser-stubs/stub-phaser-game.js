import StubPhaserGameObjectFactory from './stub-phaser-game-object-factory';
import StubPhaserPhysics           from './stub-phaser-physics';
import StubPhaserCache             from './stub-phaser-cache';
import StubPhaserInput             from './stub-phaser-input';

export default () => ({
    add     : StubPhaserGameObjectFactory(),
    physics : StubPhaserPhysics(),
    cache   : StubPhaserCache(),
    input   : StubPhaserInput(),
    onPause: {
        add: () => {}
    },
    onResume: {
        add: () => {}
    },
    world:{}
});