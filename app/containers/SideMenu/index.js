import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MAIN_SCENE_DRAWER } from '../../router';
import I18n from '../../lib/i18n';
import { logout } from '../../modules/auth';
import HugeButton from '../../components/HugeButton';

const { func } = PropTypes;

const translate = I18n.namespace('containers.sideMenu');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#EB726F'
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
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#fff'
  },

  footer: {
    paddingHorizontal: 10,
    paddingVertical: 15
  },

  hugeButton: {
    marginBottom: 20,
    backgroundColor: '#fff'
  },

  hugeButtonText: {
    color: '#E96E66',
    fontFamily: 'Poppins',
    fontSize: 18
  },

  titleContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fff',
    alignItems: 'center',
    paddingTop: 27,
    paddingBottom: 4
  },

  titleText: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    lineHeight: 33
  }
});

class SideMenu extends Component {
  static propTypes = {
    logout: func.isRequired,
  }

  onLogoutPress = () => {
    Actions.refresh({ key: MAIN_SCENE_DRAWER, open: false });
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
        <View style={ styles.titleContainer }>
          <Text style={ styles.titleText }>{ I18n.t('containers.sideMenu.title') }</Text>
        </View>
        <View style={ styles.content }>
          {/* <HugeButton style={ styles.contentButton } onPress={ this.onMainContentPress }>
            <Icon name="timeline" size={ 26 } color="#ED9090" />
            <Text style={ styles.contentButtonText }>{ I18n.t('containers.timeline.title') }</Text>
          </HugeButton> */}
        </View>
        <View style={ styles.footer }>
          {/* <HugeButton
            onPress={ this.onChangeProfilePress }
            style={ styles.hugeButton }
            textStyle={ styles.hugeButtonText }
          >
            { I18n.t('containers.changePassword.title') }
          </HugeButton> */}
          <HugeButton
            onPress={ this.onLogoutPress }
            style={ [styles.hugeButton, { marginBottom: 0 }] }
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
