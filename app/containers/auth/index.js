import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Alert } from 'react-native';
import styles from '../styles';
import TabView from '../../components/TabView';
import ShelfieLogo from '../../components/ShelfieLogo';
import TextContent from '../../components/TextContent';
import Form from '../../components/Form';
import Input from '../../components/Form/Input';
import SubmitButton from '../../components/Form/SubmitButton';
import HugeButton from '../../components/HugeButton';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { login, requestFacebookAuth } from '../../modules/auth';
const { func } = PropTypes;

class AuthContainer extends Component {
  static propTypes = {
    requestFacebookAuth: func.isRequired,
    login: func.isRequired
  }

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

  validate = ({ email, password }) => {
    if (!email.length) return ['Missing e-mail', 'Please fill in your e-mail address to login'];
    if (!password.length) return ['Missing password', 'Please fill in your password to login'];
    return null;
  }

  login = ({ email, password }, validationError) => {
    if (validationError) {
      Alert.alert(...validationError);
    } else {
      this.props.login(email, password);
    }
  }

  facebook = () => {
    this.props.requestFacebookAuth();
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
        <Form onSubmit={ this.login } validate={ this.validate }>
          <View style={ [styles.containerViewAuth] }>
            <View style={ styles.authDialogContainer }>
              <ShelfieLogo size={ 124 } style={{ marginTop: -Math.abs(this.state.keyboardHeight) }} />
              { !isSmallScreen &&
                <View><TextContent style={ styles.loginText } i18nKey="auth.login.welcome" /></View>
              }
              <View>
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onReturn="submit"
                  style={{ marginTop: 15 }}
                />
              </View>
            </View>
            <View style={ buttonContainerStyles }>
              <SubmitButton
                name="submit"
                component={ HugeButton }
                style={{ [isSmallScreen ? 'marginRight' : 'marginBottom']: 15 }}
                onPress={ this.login }
              >
                Login
              </SubmitButton>
              <HugeButton style={{ backgroundColor: '#3B5998' }} onPress={ this.facebook }>
                Facebook
              </HugeButton>
            </View>
            <KeyboardSpacer onToggle={ this.onKeyboardToggle } />
          </View>
        </Form>
      </View>
    );
  }
}

const mapDispatchToProps = {
  login,
  requestFacebookAuth
};

export default connect(null, mapDispatchToProps)(AuthContainer);
