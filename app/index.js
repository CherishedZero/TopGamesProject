import { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Game from '../components/games.js';
import { Button } from '@rneui/base';
import { Icon } from '@rneui/themed';
import AntIcon from "react-native-vector-icons/AntDesign";
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
    getGames().catch(function () {
        // This would be a handler for unhandled promise rejection error
    });;
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
          <Text style={{fontSize:50, color:'lightgray'}}>Top {games.length} Games</Text>
          <Game game={game} gameIndex={gameIndex} />
          <View style={styles.buttonsContainer}>
            <Button onPress={() => handleGamePress(gameIndex - 1)} buttonStyle={0 < gameIndex ? Object.assign({}, styles.leftButton, styles.active) : styles.leftButton}>
                <AntIcon name="arrowleft" color="white" />
            </Button>
            <Text style={styles.indexDisplay}>Rank {gameIndex+1}</Text>
            <Button onPress={() => handleGamePress(gameIndex + 1)} buttonStyle={games.length-1 > gameIndex ? Object.assign({}, styles.rightButton, styles.active) : styles.rightButton}>
                <AntIcon name="arrowright" color="white" />
            </Button>
          </View>
          <StatusBar style="auto" />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: .7,
    alignItems: 'center',
    flexDirection: 'row',
  },
  active: {
    borderColor: 'darkorange',
    color: 'darkorange'
  },
  buttonLabel: {
    color: 'lightgray',
    fontSize: 14,
    textAlign: 'center',
  },
  indexDisplay: {
    backgroundColor: "#222",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "darkorange",
    marginHorizontal: 10,
    padding: 10,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'lightgray',
    fontSize: 20,
    textAlign: 'center',
  },
  leftButton: {
    backgroundColor: "#222",
    borderWidth: 5,
    borderColor: "#999",
    marginHorizontal: 10,
    padding: 1,
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
  rightButton: {
    backgroundColor: "#222",
    borderWidth: 5,
    borderColor: "#999",
    marginHorizontal: 10,
    padding: 1,
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },
});
