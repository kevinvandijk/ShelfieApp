import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },

  controlsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },

  videoPlayerControls: {
    alignSelf: 'center',
    width: pxToDpi(324),
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

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDpi(170)
  },

  titleText: {
    fontFamily: 'Lato-Black',
    fontSize: pxToDpi(32),
    color: '#333'
  },

  video: {
    flex: 1,
    backgroundColor: '#eee'
  },

  videoContainer: {
    flex: -1,
    height: pxToDpi(1000)
  },

  bigPlayButton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'

  }
});
