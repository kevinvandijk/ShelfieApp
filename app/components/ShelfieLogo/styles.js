import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  text: {
    fontFamily: 'Lato-Black',
    fontSize: pxToDpi(62),
    color: '#303030',
    textAlign: 'center',
    paddingTop: pxToDpi(20)
  }
});
