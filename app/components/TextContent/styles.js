import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    fontSize: pxToDpi(24),
    color: '#515253',
    lineHeight: pxToDpi(33)
  }
});
