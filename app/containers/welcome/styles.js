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

  backgroundGradient: {
    flex: 1
  },

  logo: {
    marginTop: 85,
    marginBottom: 20,
    alignSelf: 'center'
  },

  introText: {
    fontSize: 20,
    lineHeight: 33,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium'
  },

  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 45
  },

  button: {
    marginBottom: 20,
    backgroundColor: '#fff'
  },

  buttonText: {
    color: 'rgb(225, 87, 84)',
    fontSize: 18,
    lineHeight: 33,
    fontFamily: 'Poppins-Medium'
  }
});
