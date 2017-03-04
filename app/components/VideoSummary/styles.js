import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 285
  },

  metaInfo: {
    position: 'absolute',
    zIndex: 1,
    left: 12,
    bottom: 12
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
  }
});
