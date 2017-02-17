import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Alert, Image } from 'react-native';

import I18n from '../../lib/i18n';
import styles from './styles';
import TextContent from '../../components/TextContent';
import Form from '../../components/Form';
import Input from '../../components/Form/Input';
import SubmitButton from '../../components/Form/SubmitButton';
import HugeButton from '../../components/HugeButton';
import { login, authScreenIsFocused } from '../../modules/auth';

const { func } = PropTypes;

const translate = I18n.namespace('containers.auth');

class AuthContainer extends Component {
  static propTypes = {
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

  componentDidMount() {
    this.emailInput.focus();
  }

  componentWillReceiveProps(props) {
    if (!props.isFocused) {
      setTimeout(() => {
        this.emailInput.blur();
        this.passwordInput.blur();
      }, 150);
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.backgroundContainer }>
          <Image
            source={ require('../../assets/images/background.png') }
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
    isFocused: authScreenIsFocused(state)
  };
};

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
