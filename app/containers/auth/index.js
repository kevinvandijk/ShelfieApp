import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styles from '../styles';
import TabView from '../../components/TabView';
import ShelfieLogo from '../../components/ShelfieLogo';
import TextContent from '../../components/TextContent';
import { pxToDpi } from '../../helpers/styles';
import Input from '../../components/Input';
import HugeButton from '../../components/HugeButton';
import KeyboardSpacer from 'react-native-keyboard-spacer';


export default class AuthContainer extends Component {
  state = {
    keyboardHeight: 0
  }

  onTabPress(key) {
    console.log('Tab pressed: ', key);
  }

  onKeyboardToggle = (enabled, height) => {
    this.setState({
      keyboardHeight: height
    });
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
      <View style={ styles.containerView }>
        <TabView tabs={ tabs } onPress={ this.onTabPress } active="login" />
        <View style={ [styles.containerViewAuth] }>

          <View style={ styles.authDialogContainer }>
            <View style={{ marginTop: -Math.abs(this.state.keyboardHeight) }}>
              <ShelfieLogo size={ pxToDpi(248) } style={ styles.loginLogo } />
              <TextContent style={ styles.loginText } i18nKey="auth.login.welcome" />
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                enablesReturnKeyAutomatically={ true }
              />
              <Input
                placeholder="Password"
                autoCapitalize="none"
                returnKeyType="go"
                enablesReturnKeyAutomatically={ true }
              />
            </View>
          </View>
          <HugeButton>Login</HugeButton>
          <HugeButton style={{ backgroundColor: '#3B5998' }}>Facebook</HugeButton>
        </View>
        <KeyboardSpacer onToggle={ this.onKeyboardToggle } />
      </View>
    );
  }
}
