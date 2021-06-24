import Ndef from 'react-native-nfc-manager/ndef-lib';
const testData = {
  ndefMessage: [
    {
      payload: [
        4,
        114,
        101,
        97,
        99,
        116,
        110,
        97,
        116,
        105,
        118,
        101,
        46,
        100,
        101,
        118,
      ],
      type: [85],
      id: [],
      tnf: 1,
    },
  ],
};

test('ndef', () => {
  /*
  const decoded = testData.ndefMessage[0].payload.reduce((acc, char) => {
    return acc + String.fromCharCode(char);
  }, '');
  */
  const decoded = Ndef.uri.decodePayload(testData.ndefMessage[0].payload);
  expect(decoded).toEqual('https://reactnative.dev');
});
