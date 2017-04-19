import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Alert, Image, Dimensions } from 'react-native';

import I18n from '../../lib/i18n';
import styles from './styles';
import TextContent from '../../components/TextContent';
import Form from '../../components/Form';
import Input from '../../components/Form/Input';
import SubmitButton from '../../components/Form/SubmitButton';
import HugeButton from '../../components/HugeButton';
import { login, authScreenIsFocused, loginFailed } from '../../modules/auth';

const { func, bool } = PropTypes;

const translate = I18n.namespace('containers.auth');

class AuthContainer extends Component {
  static propTypes = {
    login: func.isRequired,
    loginFailed: bool
  }

  static defaultProps = {
    loginFailed: false
  };

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

  componentDidMount() {
    this.emailInput.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFocused) {
      setTimeout(() => {
        if (this.emailInput) this.emailInput.blur();
        if (this.passwordInput) this.passwordInput.blur();
      }, 150);
    }

    if (nextProps.loginFailed && nextProps.loginFailed !== this.props.loginFailed) {
      Alert.alert('Oeps!', 'Je gebruikersnaam/wachtwoord kloppen niet.');
    }
  }

  render() {
    const { width } = Dimensions.get('window');
    const background = width > 375
      ? require('../../assets/images/background-plus.png') // eslint-disable-line
      : require('../../assets/images/background.png');

    return (
      <View style={ styles.container }>
        <View style={ styles.backgroundContainer }>
          <Image
            source={ background }
            style={ styles.backgroundImage }
          />
        </View>
        <View style={ styles.content }>
          <View>
            <TextContent style={ styles.leader } i18nKey="containers.auth.welcomeBack" />
            <TextContent style={ styles.normalText } i18nKey="containers.auth.enterEmail" />
          </View>
          <Form style={ styles.form } onSubmit={ this.login } validate={ this.validate }>
            <View style={ [styles.inputContainer, styles.emailInputContainer] }>
              <Input
                name="email"
                placeholder={ translate('content.email') }
                placeholderTextColor="rgba(255, 255, 255, .8)"
                selectionColor="rgba(255, 255, 255, .8)"
                underlineColorAndroid="transparent"
                type="email"
                ref={ (c) => { this.emailInput = c; } }
                style={ styles.input }
              />
            </View>
            <View style={ styles.inputContainer }>
              <Input
                name="password"
                type="password"
                placeholder={ translate('content.password') }
                placeholderTextColor="rgba(255, 255, 255, .8)"
                selectionColor="rgba(255, 255, 255, .8)"
                underlineColorAndroid="transparent"
                onReturn="submit"
                ref={ (c) => { this.passwordInput = c; } }
                style={ styles.input }
                // style={{ marginTop: 15 }}
              />
            </View>
            <SubmitButton
              name="submit"
              component={ HugeButton }
              style={ styles.submitButton }
              textStyle={ styles.submitButtonText }
              onPress={ this.login }
            >
              { translate('content.login') }
            </SubmitButton>
          </Form>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFocused: authScreenIsFocused(state),
    loginFailed: loginFailed(state)
  };
};

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
