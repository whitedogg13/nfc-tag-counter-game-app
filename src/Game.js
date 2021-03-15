import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import NfcManager from 'react-native-nfc-manager';

function Game(props) {
  return (
    <View style={styles.wrapper}>
      <Text>NFC Game</Text>
      <TouchableOpacity style={styles.btn}>
        <Text>START</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
});

export default Game;
