import { StyleSheet } from 'react-native';

function dpi(size) {
  return size / 2;
}

export default StyleSheet.create({
  container: {
    backgroundColor: '#E24546',
    height: dpi(88),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  text: {
    color: '#fff',
    fontSize: dpi(24)
  }
});
