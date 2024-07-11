import { Text, Pressable, View, TextInput, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import Button from '../components/button';
import { GameContext } from '../components/gamesContext.js';
import { useContext, useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export default function Page() {
  const db = useSQLiteContext();
  const { game, setGame } = useContext(GameContext);
  const [games, setGames] = useState(db);
  useEffect(() => {
    async function getGames() {
        const tempGames = await db.getAllAsync('SELECT * FROM games');
        setGames(tempGames);
        setGame(tempGames[gameIndex])
    }
    getGames().catch(function () {
        // This exists to stop it from pushing an unhandled promise rejection error
    });
  }, [games]);

  const [ index, setIndex ] = useState("0");
  const [ gameName, setGameName ] = useState("");
  const [ gamePlatforms, setGamePlatforms ] = useState("");
  const [ gameGenre, setGameGenre ] = useState("");
  const [ gameYear, setGameYear ] = useState("");
  const [ gameURL, setGameURL ] = useState("");

  const updateGame = () => {
    if( !isNaN(index) && index != "") {
//        game.splice([parseInt(index)-1], 1, {
//            "name": gameName,
//            "genre": gameGenre,
//            "platform": gamePlatforms,
//            "year": gameYear,
//            "imageURL": gameURL,
//            "index": parseInt(index)-1
//        });
        if (parseInt(index) < games.length+1) {
            async function updateTable() {
                const query = "UPDATE games SET name = \""+ gameName + "\", genre = \""+ gameGenre + "\", platform = \""+ gamePlatforms + "\", year = "+ gameYear + ", imageURL = \""+ gameURL + "\"  WHERE gameIndex = " + parseInt(index) + ";";
                await db.runAsync(query);
            }
            updateTable().catch(function () {
                // This exists to stop it from pushing an unhandled promise rejection error
            });
        }
        if (parseInt(index) == games.length+1) {
            async function insertNewEntry() {
                await db.runAsync('INSERT INTO games (name, genre, platform, year, imageURL) VALUES (?, ?, ?, ?, ?)', gameName, gameGenre, gamePlatforms, gameYear, gameURL);
            }
            insertNewEntry().catch(function () {
                // This exists to stop it from pushing an unhandled promise rejection error
            });
        }
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
        <Text>Rank (1-{games.length+1})</Text>
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