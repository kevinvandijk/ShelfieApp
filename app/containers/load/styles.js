import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },

  backgroundContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  logo: {
    marginTop: 263,
    alignSelf: 'center',
  }
});
