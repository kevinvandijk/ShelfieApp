import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 285,
    marginBottom: 10,
    shadowColor: '#737373',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6
  },

  metaInfo: {
    position: 'absolute',
    zIndex: 2,
    left: 10,
    bottom: 10
  },

  title: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 33,
    color: '#fff',
    backgroundColor: 'transparent'
  },

  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
    backgroundColor: 'transparent'
  },

  image: {
    flex: 1
  },

  overlay: {
    position: 'absolute',
    zIndex: 1,
    height: 285
  }
});
