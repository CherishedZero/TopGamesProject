import { Text, Pressable, View, TextInput, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import Button from '../components/button';
import { GameContext } from '../components/gamesContext.js';
import { useContext, useState } from 'react';

export default function Page() {
  const { game, setGame } = useContext(GameContext);

  const [ index, setIndex ] = useState(0);
  const [ indexDisplay, setIndexDisplay ] = useState("0")
  const [ gameName, setGameName ] = useState(game[index].name);
  const [ gamePlatforms, setGamePlatforms ] = useState(game[index].platform);
  const [ gameGenre, setGameGenre ] = useState(game[index].genre);
  const [ gameYear, setGameYear ] = useState(game[index].year);
  const [ gameURL, setGameURL ] = useState(game[index].imageURL);

  const updatePlatforms = (text) => {
    const platforms = text.split(',').join(' | ');
    setGamePlatforms(platforms);
  }

  const updateGame = () => {
    console.log(gameName);
    let obj = {
        "name": gameName,
        "genre": gameGenre,
        "platform": gamePlatforms,
        "year": gameYear,
        "imageURL": gameURL,
        "index": index
    }
    setGame([obj, [game[1], game[2]]]);
  }

  const updateIndex = (text) => {
  setIndexDisplay(text);
    if( !isNaN(text) && text != "") {
        setIndex(parseInt(text)-1);
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
            onChangeText={updatePlatforms}
        />
        <Text>Genre</Text>
        <TextInput
            style={styles.input}
        />
        <Text>Initial Release</Text>
        <TextInput
            style={styles.input}
        />
        <Text>Image URL</Text>
        <TextInput
            style={styles.input}
        />
        <Text>Ranking (1-3)</Text>
        <TextInput
            style={styles.input}
            onChangeText={updateIndex}
            value={indexDisplay}
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