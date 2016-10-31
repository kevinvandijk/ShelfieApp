import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions } from 'react-native';
import styles from '../styles';
import TabView from '../../components/TabView';
import ShelfieLogo from '../../components/ShelfieLogo';
import TextContent from '../../components/TextContent';
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

  login = () => {
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

    const isSmallScreen = Dimensions.get('window').height < 667;

    let buttonContainerStyles;
    if (isSmallScreen) {
      buttonContainerStyles = {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
      };
    }

    return (
      <View style={ styles.containerView }>
        <TabView tabs={ tabs } onPress={ this.onTabPress } active="login" />
        <View style={ [styles.containerViewAuth] }>
          <View style={ styles.authDialogContainer }>
            <ShelfieLogo size={ 124 } style={{ marginTop: -Math.abs(this.state.keyboardHeight) }} />
            { !isSmallScreen &&
              <View><TextContent style={ styles.loginText } i18nKey="auth.login.welcome" /></View>
            }
            <View>
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
                onSubmitEditing={ this.login }
                onChangeText={ (password) => this.setState({ password }) }
                onFocus={ this.onFocus }
                value={ this.state.password }
                ref="passwordField"
                style={{ marginTop: 15 }}
              />
            </View>
          </View>
          <View style={ buttonContainerStyles }>
            <HugeButton style={{ [isSmallScreen ? 'marginRight' : 'marginBottom']: 15 }} onPress={ this.login }>
              Login
            </HugeButton>
            <HugeButton style={{ backgroundColor: '#3B5998' }}>Facebook</HugeButton>
          </View>
          <KeyboardSpacer onToggle={ this.onKeyboardToggle } />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(AuthContainer);
