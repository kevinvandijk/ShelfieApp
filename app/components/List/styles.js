import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: '#E24546',
    height: pxToDpi(60),
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerText: {
    fontFamily: 'Lato-Black',
    fontSize: pxToDpi(22),
    color: '#FFF'
  },

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
