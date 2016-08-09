import { StyleSheet } from 'react-native';

function dpi(size) {
  return size / 2;
}

export default StyleSheet.create({
  container: {
    backgroundColor: '#E24546',
    flex: 1,
    height: dpi(88),
    top: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    color: '#fff',
    fontSize: dpi(24)
  }
});
