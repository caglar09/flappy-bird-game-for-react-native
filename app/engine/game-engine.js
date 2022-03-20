import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from '../entities';
import {Physics} from '../physics';
import {GAME_EVENTS} from '../constants';

const GameArea = () => {
  const gameEngine = useRef();
  const [running, setRunning] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    setMenuShow(true);
    return () => {
      setRunning(false);
    };
  }, []);

  const startGame = () => {
    setMenuShow(false);
    setRunning(true);
  };

  const onEvent = event => {
    switch (event.type) {
      case GAME_EVENTS.GAME_OVER:
        setRunning(false);
        gameEngine.current?.stop?.();
        gameEngine.current?.swap(entities());
        setPoint(0);
        setMenuShow(true);
        break;

      case GAME_EVENTS.POINT_CHANGE:
        setPoint(point + 1);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.point}>{point}</Text>
      <GameEngine
        ref={gameEngine}
        running={running}
        systems={[Physics]}
        entities={entities()}
        onEvent={onEvent}
        style={styles.gameArea}
      />
      <Modal visible={menuShow}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={startGame}>
            <Text style={styles.menuButtonTitle}>Oyna</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default GameArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  gameArea: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  point: {
    position: 'absolute',
    textAlign: 'center',
    top: 20,
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    width: '100%',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
