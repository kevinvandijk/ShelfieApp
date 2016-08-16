import { StyleSheet } from 'react-native';
import { pxToDpi } from '../helpers/styles';

export default StyleSheet.create({
  containerView: {
    top: pxToDpi(128)
  },

  containerViewAuth: {
    flex: 1,
    backgroundColor: '#eee'
  },

  authDialogContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: pxToDpi(30)
  },

  loginLogo: {
    flex: 1,
    alignSelf: 'center',
    top: pxToDpi(40)
  }
});
