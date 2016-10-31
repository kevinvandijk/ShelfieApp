import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const { string, oneOfType, object, number, func } = PropTypes;

const HugeButton = (props) => {
  return (
    <TouchableOpacity onPress={ props.onPress } style={ [styles.container, props.style] }>
      <Text style={ [styles.text, props.textStyle] }>
        { props.children.toUpperCase() }
      </Text>
    </TouchableOpacity>
  );
};

HugeButton.propTypes = {
  children: string.isRequired,
  style: oneOfType([object, number]),
  textStyle: oneOfType([object, number]),
  onPress: func
};

export default HugeButton;
