import { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, onPress, active}) {
  return (
      <Pressable style={active ? Object.assign({}, styles.button, styles.active) : styles.button} onPress={onPress}>
        <Text style={active ? Object.assign({}, styles.buttonLabel, styles.active) : styles.buttonLabel}>{label}</Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#222",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#999",
    marginHorizontal: 10,
    padding: 1,
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  active: {
    borderColor: 'darkorange',
    color: 'darkorange'
  },
  buttonLabel: {
    color: 'lightgray',
    fontSize: 14,
    textAlign: 'center',
  },
});
