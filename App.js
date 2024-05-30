import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './components/games.js';
import Button from './components/button.js';

import games from './assets/games.json';

const dsImage = require('./assets/DarkSouls.jpg');
const adImage = require('./assets/AzureDreams.jpg');
const msImage = require('./assets/MonsterSeed.jpg');


export default function App() {
  const [gameIndex, setGameIndex] = useState(0);

  const handleGamePress = (index) => {
      setGameIndex(index);
  }

  const imageList = [adImage, msImage, dsImage];

  return (
    <View style={styles.container}>
      <Game games={games} imageList={imageList} gameIndex={gameIndex} />
      <View style={styles.buttonsContainer}>
        <Button label={'Game1'} onPress={() => handleGamePress(0)} />
        <Button label={'Game2'} onPress={() => handleGamePress(1)} />
        <Button label={'Game3'} onPress={() => handleGamePress(2)} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1/3,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
