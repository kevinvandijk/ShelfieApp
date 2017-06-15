import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1
  },
});
