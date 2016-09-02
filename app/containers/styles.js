import { StyleSheet } from 'react-native';
import { pxToDpi } from '../helpers/styles';

const dialogPadding = 25;

export default StyleSheet.create({
  containerView: {
    flex: 1,
  },

  containerViewAuth: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingHorizontal: pxToDpi(30),
    paddingVertical: pxToDpi(15),
    backgroundColor: '#eee'
  },

  authDialogContainer: {
    paddingHorizontal: pxToDpi(dialogPadding),
    paddingVertical: 0,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },

  loginLogo: {
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
