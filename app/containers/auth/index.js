import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Alert } from 'react-native';

import I18n from '../../lib/i18n';
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

const translate = I18n.namespace('containers.auth');

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
    if (!email.length) {
      return [translate('errors.missingEmail'), translate('errors.missingEmailDescription')];
    }
    if (!password.length) {
      return [translate('errors.missingPassword'), translate('errors.missingPasswordDescription')];
    }
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
      title: translate('tabs.login'),
      key: 'login'
    }, {
      title: translate('tabs.register'),
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

    const { keyboardHeight } = this.state;

    return (
      <View style={ styles.containerView }>
        <TabView tabs={ tabs } onPress={ this.onTabPress } active="login" />
        <Form onSubmit={ this.login } validate={ this.validate }>
          <View style={ [styles.containerViewAuth] }>
            <View style={ styles.authDialogContainer }>
              <ShelfieLogo size={ 124 } style={{ marginTop: -Math.abs(keyboardHeight) }} />
              { !isSmallScreen &&
                <View>
                  <TextContent style={ styles.loginText }>
                    { translate('content.welcome') }
                  </TextContent>
                </View>
              }
              <View>
                <Input
                  name="email"
                  placeholder={ translate('content.email') }
                  type="email"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder={ translate('content.password') }
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
                { translate('content.login') }
              </SubmitButton>
              <HugeButton style={{ backgroundColor: '#3B5998' }} onPress={ this.facebook }>
                { translate('content.facebookLogin') }
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
