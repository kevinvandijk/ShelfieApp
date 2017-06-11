import { StyleSheet, Platform } from 'react-native';

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
    marginTop: 23,
    marginBottom: 20
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
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: 'bold'
      },
      android: {
        fontFamily: 'Poppins-Bold'
      }
    }),
    fontSize: 30,
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
    shadowColor: '#737373',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  }
});
