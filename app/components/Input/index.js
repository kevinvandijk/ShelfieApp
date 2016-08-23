import React, { PropTypes } from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const { object, number, oneOfType } = PropTypes;

const Input = (props) => {
  return (
    <TextInput
      { ...props }
      style={ [styles.textInput, props.style] }
    />
  );
};

Input.propTypes = {
  style: oneOfType([object, number])
};

export default Input;
