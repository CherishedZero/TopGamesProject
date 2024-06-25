import { useState } from 'react';
import { Slot } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { GameContext } from '../components/gamesContext.js';
import gameData from '../assets/games.json';
import NavBar from '../components/navbar';

export default function HomeLayout() {
  const [game, setGame] = useState(gameData);
  return (
    <View style={styles.container}>
        <NavBar/>
        <GameContext.Provider value={{game, setGame}}>
            <Slot />
        </GameContext.Provider>
    </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        paddingTop: 20,
    },
});


