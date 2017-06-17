import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff'
  },

  videoPlayerControls: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 74,
    marginTop: 23,
    marginBottom: 20
  },

  fullscreenControls: {
    minWidth: 250,
    paddingRight: 0,
    paddingLeft: 0
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
    justifyContent: 'center',
    paddingHorizontal: 15
  },

  titleText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        padding: 0,
        height: 40,
        lineHeight: 40,
        width: '100%',
      },
      android: {
        fontFamily: 'Poppins-Bold',
        paddingLeft: 8,
        paddingRight: 10
      }
    }),
    fontSize: 30,
    color: '#333',
    textAlign: 'center',
    textAlignVertical: 'center'
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
    backgroundColor: '#000',
    shadowColor: '#737373',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6
  },

  overlayProgressContainer: {
    marginTop: -22,
    marginHorizontal: 20
  },

  videoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    height: 24
  },

  videoButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  videoProgress: {
    flex: 1,
    height: 24
  },

  videoIcons: {
    backgroundColor: 'transparent',
    marginRight: 10
  },

  volumeSliderContainer: {
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100
  },

  volumeSlider: {
    height: 30,
    marginTop: 8,
    marginLeft: 5,
    flex: 1
  }
});
