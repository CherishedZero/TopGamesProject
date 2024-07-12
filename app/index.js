import { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from '../components/games.js';
import Button from '../components/button.js';
import { useSQLiteContext } from 'expo-sqlite';

export default function App() {
  const db = useSQLiteContext();
  const [gameIndex, setGameIndex] = useState(0);
  const [game, setGame] = useState(db[gameIndex]);
  const [games, setGames] = useState(db);
  useEffect(() => {
    async function getGames() {
        const tempGames = await db.getAllAsync('SELECT * FROM games');
        setGames(tempGames);
        setGame(tempGames[gameIndex])
    }
    getGames();
  }, [games]);

  const handleGamePress = (index) => {
      if(index >= 0 && index < games.length) {
        setGameIndex(index);
      }
  }

  if( game == null) {
      return (
          <Text>Loading</Text>
      )
  } else {

      return (
        <View style={styles.container}>
          <Text style={{fontSize:50}}>Top {games.length} Games</Text>
          <Game game={game} gameIndex={gameIndex} />
          <View style={styles.buttonsContainer}>
            <Button label={"<"} onPress={() => handleGamePress(gameIndex - 1)} active={0 < gameIndex} />
            <Button label={gameIndex+1} />
            <Button label={">"} onPress={() => handleGamePress(gameIndex + 1)} active={games.length-1 > gameIndex} />
          </View>
          <StatusBar style="auto" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: .7,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
