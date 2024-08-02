import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@rneui/base';
import { Icon } from '@rneui/themed';
import AntIcon from "react-native-vector-icons/AntDesign";

export default function NavBar() {
    const handleHome = () => {
        router.navigate('/');
    }
    const handleEdit = () => {
        router.navigate('edit');
    }
    return (
        <View style={{ flexDirection:"row", justifyContent:"center"}}>
            <Button title="Top Games" onPress = {handleHome} buttonStyle={styles.button}>
                <AntIcon name="home" color="white" size={20} />
            </Button>
            <Button onPress = {handleEdit} buttonStyle={styles.button}>
                <AntIcon name="edit" color="white" size={20} />
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
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
});