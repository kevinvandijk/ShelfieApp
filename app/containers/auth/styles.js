import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 45
  },

  backgroundContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },

  leader: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 33,
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: 'bold'
      },
      android: {
        fontFamily: 'Poppins-Bold'
      }
    }),
    textAlign: 'center'
  },

  form: {
    flex: 1,
    marginTop: 90
  },

  normalText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins',
    lineHeight: 20,
    textAlign: 'center'
  },

  inputContainer: {
    flex: 1,
    flexBasis: 34,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },

  emailInputContainer: {
    marginBottom: 36
  },

  input: {
    flex: 1,
    flexBasis: (Platform.OS === 'ios') ? 34 : 42,
    backgroundColor: 'transparent',
    fontFamily: 'Poppins',
    fontSize: 20,
    lineHeight: 44,
    color: '#fff'
  },

  submitButton: {
    backgroundColor: '#fff'
  },

  submitButtonText: {
    color: '#EB6C62',
    fontFamily: 'Poppins',
    fontSize: 18
  }
});
