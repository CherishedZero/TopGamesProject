import { useState, useEffect } from 'react';
import { Slot } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import NavBar from '../components/navbar';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

export default function HomeLayout() {
  const [game, setGame] = useState(null);
  return (
    <View style={styles.container}>
        <SQLiteProvider databaseName="topgames.db" onInit={initializeDB}>
            <NavBar/>
            <Slot />
        </SQLiteProvider>
    </View>
    )
}

 async function initializeDB(db) {
     await db.execAsync(`
         PRAGMA journal_mode = 'wal';
         CREATE TABLE IF NOT EXISTS games (name TEXT NOT NULL, genre TEXT NOT NULL, platform TEXT NOT NULL, year INT NOT NULL, imageURL TEXT NOT NULL, gameIndex INTEGER PRIMARY KEY);
     `);
     const result = await db.getAllAsync('SELECT * FROM games');
     if( result.length == 0 ) {
         await db.runAsync('INSERT INTO games (name, genre, platform, year, imageURL) VALUES (?, ?, ?, ?, ?)', "Azure Dreams", "Roguelike RPG", "Playstation,Gameboy", 1997, "https://s.uvlist.net/l/y2007/01/33514.jpg");
         await db.runAsync('INSERT INTO games (name, genre, platform, year, imageURL) VALUES (?, ?, ?, ?, ?)', "Monster Seed", "RPG", "Playstation", 1999, "https://www.video-games-museum.com/en/boxart/Playstation/36015_us-Monster-Seed.jpg");
         await db.runAsync('INSERT INTO games (name, genre, platform, year, imageURL) VALUES (?, ?, ?, ?, ?)', "Dark Souls", "Action RPG", "Playstation,Xbox,PC", 2011, "http://www.firsthour.net/screenshots/dark-souls/dark-souls-cover-thumb.jpg");
     }
 }

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        paddingTop: 20,
    },
});


