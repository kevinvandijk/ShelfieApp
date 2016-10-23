import { StyleSheet } from 'react-native';
import { pxToDpi } from '../helpers/styles';

const dialogPadding = 25;

export default StyleSheet.create({
  containerView: {
    flex: 1,
  },

  containerViewAuth: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingHorizontal: pxToDpi(30),
    paddingVertical: pxToDpi(30),
    backgroundColor: '#eee',
    overflow: 'hidden'
  },

  authDialogContainer: {
    paddingHorizontal: pxToDpi(dialogPadding),
    paddingVertical: pxToDpi(dialogPadding),
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: pxToDpi(30),
    flex: 1,
    justifyContent: 'space-between'
  },

  loginLogo: {
    marginBottom: pxToDpi(20),
  },

  loginText: {
    textAlign: 'center',
    marginLeft: pxToDpi(78 - dialogPadding),
    marginRight: pxToDpi(78 - dialogPadding),
    marginBottom: pxToDpi(87),
    color: '#9B9B9B'
  }
});
