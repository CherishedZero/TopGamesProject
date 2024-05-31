import { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, onPress, active}) {
  return (
      <Pressable style={active ? styles.button_active : styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#222",
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 1,
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button_active: {
    backgroundColor: 'darkorange',
    borderRadius: 10,
    marginHorizontal: 10,
    border: '10px solid blue',
    padding: 1,
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
