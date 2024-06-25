import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from '../components/games.js';
import Button from '../components/button.js';

import games from '../assets/games.json';

export default function App() {
  const [gameIndex, setGameIndex] = useState(0);

  const handleGamePress = (index) => {
      setGameIndex(index);
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:60}}>Top 3 Games</Text>
      <Game games={games} gameIndex={gameIndex} />
      <View style={styles.buttonsContainer}>
      {games.map( info => (
        <Button label={info.name} onPress={() => handleGamePress(info.index)} active={info.index===gameIndex} />
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
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
