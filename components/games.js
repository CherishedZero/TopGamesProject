import { StyleSheet, Image, Text } from 'react-native';

export default function Game( props ) {
    return (
    <>
        <Text style={{fontSize:30}}>{props.game.name}</Text>
        <Image style={styles.image}
        source={{uri: props.game.imageURL}} />
        <Text>Platforms: {props.game.platform}</Text>
        <Text>Genre: {props.game.genre}</Text>
        <Text>Initial Release: {props.game.year}</Text>
    </>
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 18,
        width: 320,
        height: 440,
        resizeMode: 'stretch',
        borderWidth: 3,
        borderColor: '#000',
    }
});