import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function App(props) {
  return (
    <View style={styles.wrapper}>
      <Text>Hello NFC!</Text>
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

export default App;
