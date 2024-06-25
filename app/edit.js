import { Text, Pressable, View, TextInput, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import Button from '../components/button';
import { GameContext } from '../components/gamesContext.js';
import { useContext, useState } from 'react';

export default function Page() {
  const { game, setGame } = useContext(GameContext);

  const [ index, setIndex ] = useState("0");
  const [ gameName, setGameName ] = useState("");
  const [ gamePlatforms, setGamePlatforms ] = useState("");
  const [ gameGenre, setGameGenre ] = useState("");
  const [ gameYear, setGameYear ] = useState("");
  const [ gameURL, setGameURL ] = useState("");

  const updateGame = () => {
    if( !isNaN(index) && index != "") {
        game.splice([parseInt(index)-1], 1, {
            "name": gameName,
            "genre": gameGenre,
            "platform": gamePlatforms,
            "year": gameYear,
            "imageURL": gameURL,
            "index": parseInt(index)-1
        });
    }
  }

  return (
    <>
        <Text>Game Name</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGameName}
            value={gameName}
        />
        <Text>Platform(s)</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGamePlatforms}
        />
        <Text>Genre</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGameGenre}
        />
        <Text>Initial Release</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGameYear}
        />
        <Text>Image URL</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGameURL}
        />
        <Text>Ranking (1-3)</Text>
        <TextInput
            style={styles.input}
            onChangeText={setIndex}
        />
        <Button
            label={"Update"}
            onPress={updateGame}
        />
    </>
    )
}

const styles = StyleSheet.create( {
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});