import { Text, Pressable, View, TextInput, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import Button from '../components/button';
import { useContext, useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export default function Page() {
  const db = useSQLiteContext();
  const [games, setGames] = useState(db);
  useEffect(() => {
    async function getGames() {
        const tempGames = await db.getAllAsync('SELECT * FROM games');
        setGames(tempGames);
    }
    getGames().catch(function () {
        // This exists to stop it from pushing an unhandled promise rejection error, this is not proper code
    });
  });

  const [ index, setIndex ] = useState("0");
  const [ gameName, setGameName ] = useState("");
  const [ gamePlatforms, setGamePlatforms ] = useState("");
  const [ gameGenre, setGameGenre ] = useState("");
  const [ gameYear, setGameYear ] = useState("");
  const [ gameURL, setGameURL ] = useState("");

  const updateGame = () => {
    if( !isNaN(index) && index != "" && parseInt(index) > 0) {
        if (parseInt(index) < games.length+1) {
            async function updateTable() {
                await db.runAsync("UPDATE games SET name = ?, genre = ?, platform = ?, year = ?, imageURL = ? WHERE gameIndex = ?;", gameName, gameGenre, gamePlatforms, gameYear, gameURL, parseInt(index));
            }
            updateTable().catch(function () {
                console.log("Update");
            });
        }
        if (parseInt(index) == games.length+1) {
            async function insertNewEntry() {
                await db.runAsync('INSERT INTO games (name, genre, platform, year, imageURL) VALUES (?, ?, ?, ?, ?)', gameName, gameGenre, gamePlatforms, gameYear, gameURL);
            }
            insertNewEntry().catch(function () {
                console.log("Insert");
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