import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import Game from './Game';

function App(props) {
  const [hasNfc, setHasNfc] = React.useState(null);

  React.useEffect(() => {
    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
      }
      setHasNfc(supported);
    }

    checkNfc();
  }, []);

  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text>You device doesn't support NFC</Text>
      </View>
    );
  }

  return <Game />;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
