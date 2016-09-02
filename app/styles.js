import { StyleSheet } from 'react-native';
import { pxToDpi } from './helpers/styles';

const styles = StyleSheet.create({
  sceneWithNavBar: {
    flex: 1,
    paddingTop: pxToDpi(128)
  },
  navBar: {
    backgroundColor: '#FFF',
    borderBottomColor: '#DDD',
  },
  navBarTitle: {
    fontFamily: 'Lato-Black',
    color: '#333'
  }
});

export default styles;
