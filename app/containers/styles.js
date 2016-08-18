import { StyleSheet } from 'react-native';
import { pxToDpi } from '../helpers/styles';

export default StyleSheet.create({
  containerView: {
    top: pxToDpi(128)
  },

  containerViewAuth: {
    flex: 1,
    backgroundColor: '#eee',
    paddingBottom: pxToDpi(30)
  },

  authDialogContainer: {
    backgroundColor: '#fff',
    margin: pxToDpi(30)
  },

  loginLogo: {
    alignSelf: 'center',
    marginTop: pxToDpi(41),
    marginBottom: pxToDpi(21)
  },

  loginText: {
    textAlign: 'center',
    marginLeft: pxToDpi(78),
    marginRight: pxToDpi(78),
    color: '#9B9B9B'
  }
});
