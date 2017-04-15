import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  sceneWithNavBar: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 54
  },

  navBar: {
    backgroundColor: '#E96A67',
    borderBottomWidth: 0
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
