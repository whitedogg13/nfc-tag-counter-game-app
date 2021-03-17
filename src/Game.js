import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Platform} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';

function Game(props) {
  const [start, setStart] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const androidPromptRef = React.useRef();

  React.useEffect(() => {
    let count = 5;
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      count--;

      if (Platform.OS === 'android') {
        androidPromptRef.current.setHintText(`${count}...`);
      } else {
        NfcManager.setAlertMessageIOS(`${count}...`);
      }

      if (count <= 0) {
        NfcManager.unregisterTagEvent().catch(() => 0);
        setDuration(new Date().getTime() - start.getTime());

        if (Platform.OS === 'android') {
          androidPromptRef.current.setVisible(false);
        }
      }
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [start]);

  async function scanTag() {
    await NfcManager.registerTagEvent();
    if (Platform.OS === 'android') {
      androidPromptRef.current.setVisible(true);
    }
    setStart(new Date());
    setDuration(0);
  }

  return (
    <View style={styles.wrapper}>
      <Text>NFC Game</Text>
      {duration > 0 && <Text>{duration} ms</Text>}
      <TouchableOpacity style={styles.btn} onPress={scanTag}>
        <Text>START</Text>
      </TouchableOpacity>

      <AndroidPrompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
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
