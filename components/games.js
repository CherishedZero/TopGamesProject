import { Image, Text } from 'react-native';

export default function Game( props ) {
    return (
    <>
        <Text style={{fontSize:40}}>{props.games[props.gameIndex].name}</Text>
        <Image style={{ width: 320, height: 440, borderRadius: 18, resizeMode: 'stretch' }} source={props.imageList[props.gameIndex]}  />
        <Text>Platforms: {props.games[props.gameIndex].platform}</Text>
        <Text>Genre: {props.games[props.gameIndex].genre}</Text>
        <Text>Initial Release: {props.games[props.gameIndex].year}</Text>
    </>
    );
}