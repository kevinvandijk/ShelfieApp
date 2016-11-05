import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import HugeButton from '../../components/HugeButton';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(204, 204, 204, .7)'
  },

  container: {
    position: 'absolute',
    top: 165,
    right: 20,
    left: 20,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 12
  },

  titleText: {
    fontFamily: 'Lato-Black',
    alignSelf: 'center',
    fontSize: 26,
    color: '#515253',
    marginBottom: 20
  },

  footer: {
    marginTop: 15,
    flexDirection: 'row'
  },

  cancelButton: {
    backgroundColor: '#515253',
    marginRight: 10
  }
});

class ChangePasswordContainer extends Component {
  state = {
    movingFields: false,
    email: null,
    password: null,
    passwordConfirm: null,
    closed: false
  }

  onFocus = () => {
    this.setState({
      movingFields: false
    });
  }

  moveToPassword = () => {
    this.setState({
      movingFields: true
    });
  }

  close = () => {
    Actions.pop();
  }

  render() {
    if (this.state.closed) return null;

    return (
      <View style={ styles.overlay }>
        <View style={ styles.container }>
          <Text style={ styles.titleText }>Change Password</Text>
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
            onSubmitEditing={ this.moveToPasswordConfirm }
            onChangeText={ (password) => this.setState({ password }) }
            onFocus={ this.onFocus }
            value={ this.state.password }
            ref="passwordField"
            style={{ marginTop: 15 }}
          />
          <Input
            placeholder="Password Confirmation"
            autoCapitalize="none"
            returnKeyType="go"
            enablesReturnKeyAutomatically
            secureTextEntry
            onSubmitEditing={ this.save }
            onChangeText={ (passwordConfirm) => this.setState({ passwordConfirm }) }
            onFocus={ this.onFocus }
            value={ this.state.passwordConfirm }
            ref="passwordField"
            style={{ marginTop: 15 }}
          />

          <View style={ styles.footer }>
            <HugeButton style={ styles.cancelButton } onPress={ this.close }>Cancel</HugeButton>
            <HugeButton onPress={ this.close }>Opslaan</HugeButton>
          </View>
        </View>
      </View>
    );
  }
}

export default ChangePasswordContainer;
