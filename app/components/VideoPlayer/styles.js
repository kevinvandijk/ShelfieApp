import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  videoPlayerControls: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 74,
    marginTop: 23
  },

  progressContainer: {
    marginHorizontal: 20,
    marginTop: 34
  },

  metadataContainer: {
    marginTop: 36,
    height: 66
  },

  progressTextContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  slider: {
    padding: 0,
    height: 24
  },

  progressText: {
    backgroundColor: 'transparent',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 20,
    color: '#333'
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
