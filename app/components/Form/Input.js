import React, { Component, PropTypes } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { noop } from 'lodash';

import { pxToDpi } from '../../helpers/styles';

const styles = StyleSheet.create({
  textInput: {
    // backgroundColor: '#eee',
    // height: pxToDpi(88),
    // alignSelf: 'stretch',
    // lineHeight: pxToDpi(88),
    // padding: pxToDpi(30),
    // fontSize: pxToDpi(24),
    // color: '#303030',
    // fontFamily: 'Lato-Regular'
  }
});


const { object, number, oneOfType, func, string, bool } = PropTypes;

class Input extends Component {
  static propTypes = {
    type: string.isRequired,
    style: oneOfType([object, number]),
    onChangeText: func,
    value: string,
    name: string.isRequired,
    onReturn: string,
    alwaysEnableReturn: bool,
    autoCapitalize: string,
    placeholder: string
  }

  static defaultProps = {
    type: 'text',
    onChangeText: noop,
    alwaysEnableReturn: false,
    onReturn: 'next'
  }

  static contextTypes = {
    attachToForm: func,
    detachFromForm: func,
    onChange: func,
    focusOnNextField: func,
    submitForm: func
  }

  state = {
    value: this.props.value || ''
  }

  componentWillMount() {
    if (this.context.attachToForm) {
      this.context.attachToForm(this);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  componentWillUnmount() {
    if (this.context.detachFromForm) {
      this.context.detachFromForm(this);
    }
  }

  onChangeText = async (value) => {
    // Await setState so the onChange handler gets the right values from state
    await this.setState({
      value
    });

    if (this.context.onChange) {
      this.context.onChange(this);
    }
    // TODO: REmove this?
    this.props.onChangeText(value);
  }

  getValue() {
    return this.state.value;
  }

  focus() {
    this.refs.input.focus();
  }

  blur() {
    this.refs.input.blur();
  }

  update() {
    this.refs.input.update();
  }

  isFocused() {
    this.refs.input.isFocused();
  }

  clear() {
    this.refs.input.clear();
  }

  moveToNextField = () => {
    if (this.context.focusOnNextField) {
      this.context.focusOnNextField(this);
    }
  }

  submit = () => {
    if (this.context.submitForm) {
      this.context.submitForm();
    }
  }

  render() {
    let textInputProps = {
      ...this.props
    };

    if (this.props.onReturn === 'next') {
      textInputProps = {
        ...textInputProps,
        returnKeyType: 'next',
        returnKeyLabel: 'Volgende',
        onSubmitEditing: this.moveToNextField,
        blurOnSubmit: false
      };
    } else if (this.props.onReturn === 'submit') {
      textInputProps = {
        ...textInputProps,
        returnKeyType: 'go',
        returnKeyLabel: 'Login',
        onSubmitEditing: this.submit
      };
    }

    // Field types:

    if (['password', 'secure'].includes(this.props.type)) {
      textInputProps = {
        ...textInputProps,
        secureTextEntry: true
      };
    }

    if (this.props.type === 'email') {
      textInputProps = {
        ...textInputProps,
        autoCapitalize: 'none',
        autoCorrect: false,
        keyboardType: 'email-address'
      };
    }

    const props = {
      ...textInputProps,
      placeholder: this.props.placeholder,
      enablesReturnKeyAutomatically: !this.props.alwaysEnableReturn,
      value: this.state.value,
      onChangeText: this.onChangeText,
    };

    return (
      <TextInput
        { ...props }
        ref="input"
        style={ [styles.textInput, this.props.style] }
      />
    );
  }
}

export default Input;
