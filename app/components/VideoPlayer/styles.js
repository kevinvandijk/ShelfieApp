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

  progressContainer: {
    height: pxToDpi(6),
    backgroundColor: '#DDD'
  },

  progressBar: {
    backgroundColor: '#E24546',
    height: pxToDpi(6)
  },

  video: {
    height: pxToDpi(804),
    backgroundColor: '#eee'
  }
});
