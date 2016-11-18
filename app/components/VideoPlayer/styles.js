import { StyleSheet } from 'react-native';
import { pxToDpi } from '../../helpers/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
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

  progressContainer: {
  },

  metadataContainer: {
    flex: 1,
    justifyContent: 'flex-end'
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
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#eee'
  },

  videoContainer: {
    flex: 1,
    maxHeight: 211
  },

  bigPlayButton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'

  }
});
