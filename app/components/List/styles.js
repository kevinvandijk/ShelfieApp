import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  rowContainer: {
    height: pxToDpi(90),
    paddingHorizontal: pxToDpi(40),
    justifyContent: 'center'
  },

  rowText: {
    fontFamily: 'Lato-Regular',
    fontSize: pxToDpi(28),
    color: '#515253'
  },

  separator: {
    height: pxToDpi(1),
    backgroundColor: '#EEE'
  }
});
