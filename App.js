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
  const gameCount = [0, 1, 2];
  const gameNames = ["Azure Dreams", "Monster Seed", "Dark Souls"];

  return (
    <View style={styles.container}>
      <Text style={{fontSize:60}}>Top 3 Games</Text>
      <Game games={games} imageList={imageList} gameIndex={gameIndex} />
      <View style={styles.buttonsContainer}>
      {gameCount.map( index => (
        <Button label={gameNames[index]} onPress={() => handleGamePress(index)} active={index===gameIndex} />
      ))}
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
    flex: 1/2,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
