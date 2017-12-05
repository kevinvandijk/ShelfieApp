import { StyleSheet, Platform } from 'react-native';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'

const iphoneHeight = isIphoneX() ? 80 : 60;
console.log('lol', iphoneHeight);
const styles = StyleSheet.create({
  sceneWithNavBar: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? iphoneHeight : 54
  },

  navBar: {
    backgroundColor: '#E96A67',
    borderBottomWidth: 0,
    ...ifIphoneX({
      height: iphoneHeight,
      paddingTop: 20
    })
  },

  navBarWithBackground: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  },

  navBarTitle: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: 'bold'
      },
      android: {
        fontFamily: 'Poppins-Bold'
      }
    }),
    fontSize: 16,
    color: '#fff'
  }
});

export default styles;
