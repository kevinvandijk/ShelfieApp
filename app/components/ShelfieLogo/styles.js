import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
  
  text: {
    fontFamily: 'Lato-Black',
    fontSize: pxToDpi(62),
    color: '#303030',
    textAlign: 'center',
    marginTop: pxToDpi(21),
    lineHeight: pxToDpi(70),
    backgroundColor: 'transparent'
  }
});
