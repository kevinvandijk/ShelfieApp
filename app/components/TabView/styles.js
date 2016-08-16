import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  container: {
    height: pxToDpi(88),
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },

  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: pxToDpi(1),
    borderBottomColor: '#DDD'
  },

  tabActive: {
    borderBottomWidth: pxToDpi(6),
    borderBottomColor: '#E24741'
  },

  text: {
    fontFamily: 'Lato-Black',
    fontSize: pxToDpi(22),
    color: '#DDD'
  },

  textActive: {
    color: '#515253'
  }
});
