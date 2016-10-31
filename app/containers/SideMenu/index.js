import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../modules/auth';
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

class SideMenu extends Component {
  onLogout = () => {
    this.props.logout();
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.content }>
        </View>
        <View style={ styles.footer }>
          <HugeButton
            onPress={ this.onLogout }
            style={ styles.hugeButton }
            textStyle={ styles.hugeButtonText }
          >
            Log out
          </HugeButton>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  logout
};

export default connect(null, mapDispatchToProps)(SideMenu);
