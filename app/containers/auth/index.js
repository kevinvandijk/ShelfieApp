import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import styles from '../styles';
import TabView from '../../components/TabView';
import ShelfieLogo from '../../components/ShelfieLogo';
import TextContent from '../../components/TextContent';
import { pxToDpi } from '../../helpers/styles';
import Input from '../../components/Input';
import HugeButton from '../../components/HugeButton';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { login } from '../../modules/auth';


class AuthContainer extends Component {
  state = {
    keyboardHeight: 0,
    movingFields: false,
    email: null,
    password: null
  }

  onTabPress(key) {
    console.log('Tab pressed: ', key);
  }

  onKeyboardToggle = (enabled, height) => {
    if (!this.state.movingFields) {
      this.setState({
        keyboardHeight: height
      });
    }
  }

  onFocus = () => {
    this.setState({
      movingFields: false
    });
  }

  onSubmit = () => {
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  moveToPassword = () => {
    this.setState({
      movingFields: true
    });

    this.refs.passwordField.focus();
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
                autoCorrect={ false }
                enablesReturnKeyAutomatically
                blurOnSubmit={ false }
                onSubmitEditing={ this.moveToPassword }
                onFocus={ this.onFocus }
                onChangeText={ (email) => this.setState({ email }) }
                value={ this.state.email }
                ref="emailField"
              />
              <Input
                placeholder="Password"
                autoCapitalize="none"
                returnKeyType="go"
                enablesReturnKeyAutomatically
                secureTextEntry
                onSubmitEditing={ this.onSubmit }
                onChangeText={ (password) => this.setState({ password }) }
                onFocus={ this.onFocus }
                value={ this.state.password }
                ref="passwordField"
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

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(AuthContainer);
