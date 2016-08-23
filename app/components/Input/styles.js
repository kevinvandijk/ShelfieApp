import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  textInput: {
    backgroundColor: '#eee',
    height: pxToDpi(88),
    alignSelf: 'stretch',
    lineHeight: pxToDpi(88),
    padding: pxToDpi(30),
    fontSize: pxToDpi(24),
    color: '#303030',
    fontFamily: 'Lato-Regular',
    marginBottom: pxToDpi(31)
  }
});
