import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  controls: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },

  videoPlayerControls: {
    alignSelf: 'center',
    width: pxToDpi(280),
    paddingVertical: pxToDpi(60)
  },

  progressBarContainer: {
    height: pxToDpi(6),
    backgroundColor: '#DDD'
  },

  progressBar: {
    backgroundColor: '#E24546',
    height: pxToDpi(6)
  },

  progressTextContainer: {
    paddingHorizontal: pxToDpi(30),
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: pxToDpi(15)
  },

  progressText: {
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    fontSize: pxToDpi(24),
    color: '#B2B2B2'
  },

  video: {
    height: pxToDpi(804),
    backgroundColor: '#eee'
  }
});
