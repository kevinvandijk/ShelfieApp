import React, { Component, PropTypes } from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const { object, number, oneOfType } = PropTypes;

class Input extends Component {
  static propTypes = {
    style: oneOfType([object, number])
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

  render() {
    return (
      <TextInput
        { ...this.props }
        ref="input"
        style={ [styles.textInput, this.props.style] }
      />
    );
  }
}

export default Input;
