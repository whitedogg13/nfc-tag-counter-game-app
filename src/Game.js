import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Alert} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

function Game(props) {
  const [startTime, setStartTime] = React.useState(null);
  const [stopTime, setStopTime] = React.useState(null);

  React.useEffect(() => {
    let count = 5;
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      count--;

      if (count === 0) {
        setStopTime(new Date());
        NfcManager.unregisterTagEvent().catch(() => 0);
      }
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      if (count !== 0) {
        Alert.alert('Warning', 'Game aborted', [{text: 'OK'}]);
      }
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };
  }, [startTime]);

  async function startGame() {
    await NfcManager.registerTagEvent();
    setStartTime(new Date());
    setStopTime(null);
  }

  return (
    <View style={styles.wrapper}>
      <Text>NFC Game</Text>

      {startTime && stopTime && (
        <Text>{`${stopTime.getTime() - startTime.getTime()}`} ms</Text>
      )}

      <TouchableOpacity style={styles.btn} onPress={startGame}>
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
