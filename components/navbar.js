import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Button from './button';

export default function NavBar() {
    const handleHome = () => {
        router.navigate('/');
    }
    const handleEdit = () => {
        router.navigate('edit');
    }
    return (
        <View style={{ flexDirection:"row", justifyContent:"center"}}>
            <Button label={"Top Games"} onPress = {handleHome} />
            <Button label={"Edit"} onPress = {handleEdit} />
        </View>
    );
}