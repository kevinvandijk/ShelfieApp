import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

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
    backgroundColor: '#EB726F',
    // opacity: 0
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
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: 'bold'
      },
      android: {
        fontFamily: 'Poppins-Bold'
      }
    }),
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
    fontSize: 14
  },

  titleContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fff',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 27 : 10,
    paddingBottom: Platform.OS === 'ios' ? 4 : 11
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
    fontSize: 24,
    color: '#fff',
    lineHeight: 33
  }
});

class SideMenu extends Component {
  static propTypes = {
    logout: func.isRequired,
    open: PropTypes.bool
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

  openPrivacyPolicy = async () => {
    Actions.privacyPolicy();
  }

  openTermsAndConditions = async () => {
    Actions.termsAndConditions();
  }

  openContactForm = async () => {
    Actions.contactForm();
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
            style={ styles.hugeButton }
            textStyle={ styles.hugeButtonText }
            onPress={ this.openContactForm }
          >
            { translate('contact') }
          </HugeButton>
          <HugeButton
            style={ styles.hugeButton }
            textStyle={ styles.hugeButtonText }
            onPress={ this.openTermsAndConditions }
          >
            { translate('termsAndConditions') }
          </HugeButton>
          <HugeButton
            style={ styles.hugeButton }
            textStyle={ styles.hugeButtonText }
            onPress={ this.openPrivacyPolicy }
          >
            { translate('privacyPolicy') }
          </HugeButton>
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
