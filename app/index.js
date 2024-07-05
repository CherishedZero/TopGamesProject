import { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from '../components/games.js';
import Button from '../components/button.js';

//import games from '../assets/games.json';
import { useSQLiteContext } from 'expo-sqlite';

export default function App() {
  const db = useSQLiteContext();
  const [game, setGame] = useState(0);
  const [gameIndex, setGameIndex] = useState(1);
  const [games, setGames] = useState(0);
  useEffect(() => {
    async function getGame() {
        const tempGames = await db.getAllAsync('SELECT * FROM games');
        const start = await db.getFirstAsync('SELECT * FROM games WHERE gameIndex=?',gameIndex);
        setGame(start);
        setGames(tempGames);
        console.log(game);
        console.log(games);
    }
    getGame();
  }, []);

  const handleGamePress = (index) => {
      setGameIndex(index);
  }

  if( game == null) {
      return (
          <Text>Loading</Text>
      )
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:60}}>Top 3 Games</Text>
      <Game game={game} gameIndex={gameIndex} />
      <View style={styles.buttonsContainer}>
        <Button label={games[0].name} onPress={() => handleGamePress(games[0].gameIndex)} active={games[0].gameIndex===gameIndex} />
        <Button label={games[1].name} onPress={() => handleGamePress(games[1].gameIndex)} active={games[1].gameIndex===gameIndex} />
        <Button label={games[2].name} onPress={() => handleGamePress(games[2].gameIndex)} active={games[2].gameIndex===gameIndex} />
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
