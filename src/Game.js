import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NfcManager from 'react-native-nfc-manager';

function Game(props) {
  return (
    <View style={styles.wrapper}>
      <Text>NFC Game</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Game;
