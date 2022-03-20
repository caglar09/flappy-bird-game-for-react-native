import Matter from 'matter-js';
import {GAME_EVENTS, windowWidth} from './constants';
import {getPipeSizePosPair} from './utils/random';

const Physics = (entities, {touches, time, dispatch}) => {
  let engine = entities.physics.engine;
  let hadTouches = false;
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      if (!hadTouches) {
        hadTouches = true;
        Matter.Body.setVelocity(entities.Bird.body, {x: 0, y: -5});
      }
    });

  Matter.Engine.update(engine, time.delta);

  for (let i = 1; i <= 2; i++) {
    if (
      entities[`ObstacleTop${i}`].body.bounds.max.x <= 0 &&
      !entities[`ObstacleTop${i}`].point
    ) {
      entities[`ObstacleTop${i}`].point = true;
      dispatch({type: GAME_EVENTS.POINT_CHANGE});
    }

    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      Matter.Body.setPosition(
        entities[`ObstacleTop${i}`].body,
        pipeSizePos.pipeTop.pos,
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${i}`].body,
        pipeSizePos.pipeBottom.pos,
      );
      entities[`ObstacleTop${i}`].point = false;
    }

    Matter.Body.translate(entities[`ObstacleTop${i}`].body, {x: -2, y: 0});
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, {x: -2, y: 0});
  }

  // GAME_OVER EVENT
  Matter.Events.on(engine, 'collisionStart', event => {
    dispatch({type: GAME_EVENTS.GAME_OVER});
  });

  if (entities.Bird.body.bounds.max.x < 0) {
    dispatch({type: GAME_EVENTS.GAME_OVER});
  }
  return entities;
};

export {Physics};
