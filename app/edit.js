import { Text, Pressable, View, TextInput, StyleSheet, Image} from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@rneui/base';
import { useContext, useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Card } from '@rneui/themed';

export default function Page() {
  const db = useSQLiteContext();
  const [games, setGames] = useState(db);
  useEffect(() => {
    async function getGames() {
        const tempGames = await db.getAllAsync('SELECT * FROM games');
        setGames(tempGames);
    }
    getGames().catch(function () {
        // This would be a handler for unhandled promise rejection error
    });
  });

  const [ index, setIndex ] = useState("0");
  const [ gameName, setGameName ] = useState("");
  const [ gamePlatforms, setGamePlatforms ] = useState("");
  const [ gameGenre, setGameGenre ] = useState("");
  const [ gameYear, setGameYear ] = useState("");
  const [ gameURL, setGameURL ] = useState("");

  const happyFace = "https://th.bing.com/th/id/R.7df19b19a907159094d0713769f78f13?rik=DrTopABW4DwxEA&riu=http%3a%2f%2fclipartmag.com%2fimages%2fsmiley-face-transparent-41.png&ehk=aM96bTm6UTExvNXe6QcnoeeiImyJ6g3PoFgXDHmkgVc%3d&risl=&pid=ImgRaw&r=0";
  const sadFace = "https://th.bing.com/th/id/R.4545d9d08915c91723a6d9d919d50fb6?rik=5l5ZRkDg4bWvkA&riu=http%3a%2f%2fclipart-library.com%2fnew_gallery%2f115-1153908_frown-face-clipart-transparent.png&ehk=ZgJjEvEk%2bAfM4jhtE%2f2XOJ8SFnF2z3AJWVFQ%2bA9iEk4%3d&risl=&pid=ImgRaw&r=0";
  const [ currentFace, setCurrentFace ] = useState(happyFace);

  const updateGame = () => {
    if( !isNaN(index) && index != "" && parseInt(index) > 0 && parseInt(index) <= games.length+1) {
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
        setCurrentFace(happyFace);
    } else {
        setCurrentFace(sadFace);
    }
   }

  return (
    <>
      <Card containerStyle={styles.invisibleBack}>
        <Text style={styles.text}>Game Name</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGameName}
            value={gameName}
        />
        <Text style={styles.text}>Platform(s)</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGamePlatforms}
        />
        <Text style={styles.text}>Genre</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGameGenre}
        />
        <Text style={styles.text}>Initial Release</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGameYear}
        />
        <Text style={styles.text}>Image URL</Text>
        <TextInput
            style={styles.input}
            onChangeText={setGameURL}
        />
        <Text style={styles.text}>Rank (1-{games.length+1})</Text>
        <TextInput
            style={styles.input}
            onChangeText={setIndex}
        />
      </Card>
      <Button
          title="Update"
          onPress={updateGame}
          buttonStyle={styles.button}
      />
      <Image style={styles.image}
      source={{uri: currentFace}} />
    </>
  )
}

const styles = StyleSheet.create( {
    input: {
        height: 30,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 8,
        paddingLeft: 10,
        backgroundColor: "#222",
        color: 'lightgray'
    },
    text: {
        marginTop: 10,
        color:'lightgray',
    },
    image: {
        borderRadius: 18,
        margin: 40,
        width: 150,
        height: 150,
        resizeMode: 'stretch',
        tintColor: '#fff'
    },
    button: {
        backgroundColor: "#222",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "darkorange",
        marginHorizontal: 10,
        padding: 1,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    invisibleBack: {
        backgroundColor: "transparent",
        borderColor: "transparent",
    }
});