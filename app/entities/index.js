import Matter from 'matter-js';
import Bird from '../components/bird';
import Floor from '../components/floor';
import Obstacle from '../components/obstacle';
import {windowHeight, windowWidth} from '../constants';
import {getPipeSizePosPair} from '../utils/random';

export default () => {
  let engine = Matter.Engine.create({enableSleeping: false});

  let world = engine.world;

  engine.gravity.y = 0.4;
  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth);

  return {
    physics: {engine, world},
    Bird: Bird(world, 'green', {x: 50, y: 200}, {height: 40, width: 40}),
    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'red',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      'blue',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),

    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'red',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      'blue',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),
    Floor: Floor(
      world,
      'green',
      {x: windowWidth / 2, y: windowHeight},
      {height: 40, width: windowWidth},
    ),
  };
};
