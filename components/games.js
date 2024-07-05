import { Image, Text } from 'react-native';

export default function Game( props ) {
    return (
    <>
        <Text style={{fontSize:40}}>{props.game.name}</Text>
        <Image style={{ width: 320, height: 440, borderRadius: 18, resizeMode: 'stretch' }}
        source={{uri: props.game.imageURL}} />
        <Text>Platforms: {props.game.platform}</Text>
        <Text>Genre: {props.game.genre}</Text>
        <Text>Initial Release: {props.game.year}</Text>
    </>
    );
}