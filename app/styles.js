import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sceneWithNavBar: {
    flex: 1,
    paddingTop: 64
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
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  }
});

export default styles;
