import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../styles';
import TabView from '../../components/TabView';
import ShelfieLogo from '../../components/ShelfieLogo';
import TextContent from '../../components/TextContent';
import { pxToDpi } from '../../helpers/styles';

export default class AuthContainer extends Component {
  onTabPress(key) {
    console.log('Tab pressed: ', key);
  }

  render() {
    const tabs = [{
      title: 'Login',
      key: 'login'
    }, {
      title: 'Register',
      key: 'register'
    }];

    return (
      <View style={ [styles.containerView, styles.containerViewAuth] }>
        <TabView tabs={ tabs } onPress={ this.onTabPress } active="login" />
        <View style={ styles.authDialogContainer }>
          <ShelfieLogo size={ pxToDpi(248) } style={ styles.loginLogo } />
          <TextContent style={ styles.loginText } i18nKey="auth.login.welcome" />

        </View>
      </View>
    );
  }
}
