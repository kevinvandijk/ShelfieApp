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
    width: 220,
    paddingVertical: pxToDpi(60)
  },

  progressContainer: {

  },

  metadataContainer: {
    flex: 1,
    paddingTop: 36
    // justifyContent: 'flex-end'
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
    justifyContent: 'center'
  },

  titleText: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 36,
    color: '#333'
  },

  descriptionText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    lineHeight: 20,
    color: '#333'
  },

  video: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000'
  },

  videoContainer: {
    flex: 1,
    minHeight: 286,
    maxHeight: 286
  },

  bigPlayButton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  metadataButtons: {
    position: 'absolute',
    right: 2,
    top: 0
  }
});
