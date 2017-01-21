import { StyleSheet } from 'react-native';

function dpi(size) {
  return size / 2;
}

export default StyleSheet.create({
  container: {
    backgroundColor: '#E24546',
    height: dpi(88),
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerDisabled: {
    backgroundColor: '#ccc'
  },

  text: {
    color: '#fff',
    fontSize: dpi(24)
  },

  textDisabled: {
    color: 'rgba(255, 255, 255, .6)'
  }
});
