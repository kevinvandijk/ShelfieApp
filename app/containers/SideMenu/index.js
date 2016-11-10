import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import I18n from '../../lib/i18n';
import { logout } from '../../modules/auth';
import HugeButton from '../../components/HugeButton';
import { View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
const { func } = PropTypes;

const translate = I18n.namespace('containers.sideMenu');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#E24546'
  },

  content: {
    paddingTop: 63.5
  },

  contentButton: {
    height: 68,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ED9090',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ED9090'
  },

  contentButtonText: {
    marginLeft: 20,
    fontFamily: 'Lato-Black',
    color: '#fff'
  },

  footer: {
  },

  hugeButton: {
    margin: 15,
    backgroundColor: '#fff'
  },

  hugeButtonText: {
    color: '#E24546',
    fontFamily: 'Lato-Black'
  }
});

class SideMenu extends Component {
  static propTypes = {
    logout: func.isRequired,
  }

  onLogoutPress = () => {
    this.props.logout();
  }

  onMainContentPress = () => {
    Actions.refresh({ key: 'drawer', open: false });
  }

  onChangeProfilePress = () => {
    Actions.changePassword();
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.content }>
          <HugeButton style={ styles.contentButton } onPress={ this.onMainContentPress }>
            <Icon name="timeline" size={ 26 } color="#ED9090" />
            <Text style={ styles.contentButtonText }>{ I18n.t('containers.timeline.title') }</Text>
          </HugeButton>
        </View>
        <View style={ styles.footer }>
          <HugeButton style={ styles.contentButton } onPress={ this.onChangeProfilePress }>
            <Icon name="person" size={ 26 } color="#ED9090" />
            <Text style={ styles.contentButtonText }>
              { I18n.t('containers.changePassword.title') }
            </Text>
          </HugeButton>
          <HugeButton
            onPress={ this.onLogoutPress }
            style={ styles.hugeButton }
            textStyle={ styles.hugeButtonText }
          >
            { translate('logout') }
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
