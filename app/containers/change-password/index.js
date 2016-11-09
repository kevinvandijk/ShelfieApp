import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import Form from '../../components/Form';
import Input from '../../components/Form/Input';
import SubmitButton from '../../components/Form/SubmitButton';
import HugeButton from '../../components/HugeButton';
import { changePassword } from '../../modules/auth';
import { Actions } from 'react-native-router-flux';
const { func } = PropTypes;

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
  static propTypes = {
    changePassword: func.isRequired
  }

  state = {
    closed: false,
    enableSaveButton: false
  }

  onFormChange = (values) => {
    this.setState({
      enableSaveButton: values.password.length && values.confirmPassword.length
    });
  }

  onSubmit = (values, validationError) => {
    if (validationError) {
      Alert.alert(...validationError);
    } else {
      this.props.changePassword(values.password);
    }
  }

  validate = (values) => {
    if (values.password.length < 6) {
      return ['Password too short', 'Please make sure your password is longer than 6 characters'];
    }

    if (values.password !== values.confirmPassword) {
      return ['Passwords do not match', 'Please make sure to enter the same new password twice'];
    }

    return null;
  }

  close = () => {
    Actions.pop();
  }

  render() {
    if (this.state.closed) return null;

    return (
      <View style={ styles.overlay }>
        <Form validate={ this.validate } onChange={ this.onFormChange } onSubmit={ this.onSubmit }>
          <View style={ styles.container }>
            <Text style={ styles.titleText }>Change Password</Text>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              style={{ marginTop: 15 }}
            />
            <Input
              name="confirmPassword"
              placeholder="Password Confirmation"
              type="password"
              onReturn="submit"
              style={{ marginTop: 15 }}
            />

            <View style={ styles.footer }>
              <HugeButton style={ styles.cancelButton } onPress={ this.close }>Cancel</HugeButton>
              <SubmitButton
                name="submit"
                component={ HugeButton }
                disabled={ !this.state.enableSaveButton }
              >
                Opslaan
              </SubmitButton>
            </View>
          </View>
        </Form>
      </View>
    );
  }
}

const mapDispatchToProps = {
  changePassword
};

export default connect(null, mapDispatchToProps)(ChangePasswordContainer);
