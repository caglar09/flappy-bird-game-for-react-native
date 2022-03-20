/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Matter from 'matter-js';

const Bird = ({body, color, ...props}) => {
  const {bounds, position} = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;

  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: color,
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Bird'},
  );

  Matter.World.add(world, initialBird);

  return {body: initialBird, color, pos, renderer: <Bird />};
};
