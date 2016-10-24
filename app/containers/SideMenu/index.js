import React from 'react';
import HugeButton from '../../components/HugeButton';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    backgroundColor: '#E24546',
    flex: 1
  },

  footer: {
    padding: 15,
    backgroundColor: '#E24546'
  },

  hugeButton: {
    backgroundColor: '#fff'
  },

  hugeButtonText: {
    color: '#E24546',
    fontFamily: 'Lato-Black'
  }
});

const SideMenu = () => {
  return (
    <View style={ styles.container }>
      <View style={ styles.content }>
      </View>
      <View style={ styles.footer }>
        <HugeButton style={ styles.hugeButton } textStyle={ styles.hugeButtonText }>
          Log out
        </HugeButton>
      </View>
    </View>
  );
};

export default SideMenu;
