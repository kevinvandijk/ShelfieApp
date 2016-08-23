import { StyleSheet } from 'react-native';
import { pxToDpi } from '../helpers/styles';

const dialogPadding = 25;

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
    margin: pxToDpi(30),
    padding: pxToDpi(dialogPadding),
    paddingTop: 0,
    paddingBottom: pxToDpi(31)
  },

  loginLogo: {
    alignSelf: 'center',
    marginTop: pxToDpi(41),
    marginBottom: pxToDpi(21)
  },

  loginText: {
    textAlign: 'center',
    marginLeft: pxToDpi(78 - dialogPadding),
    marginRight: pxToDpi(78 - dialogPadding),
    marginBottom: pxToDpi(87),
    color: '#9B9B9B'
  }
});
