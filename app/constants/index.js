import {Dimensions} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const GAME_EVENTS = {
  GAME_START: 1,
  GAME_PAUSED: 2,
  POINT_CHANGE: 3,
  GAME_OVER: 999,
};

export {windowHeight, windowWidth, GAME_EVENTS};
