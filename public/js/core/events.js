import {makeEvent} from '../helper/event-helper';

export const BallHitWall   = makeEvent();
export const BallHitPaddle = makeEvent();
export const BallHitBrick  = makeEvent();
export const BrickKilled   = makeEvent();
export const GameOver      = makeEvent();
export const BallReleased  = makeEvent();
export const RestartBall   = makeEvent();
export const BallLost      = makeEvent();
export const NextLevel     = makeEvent();