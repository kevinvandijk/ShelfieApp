import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const { oneOfType, object, number, func, node } = PropTypes;

const HugeButton = (props) => {
  let childComponents;
  if (typeof props.children === 'string') {
    childComponents = (
      <Text style={ [styles.text, props.textStyle] }>
        { props.children.toUpperCase() }
      </Text>
    );
  } else {
    childComponents = props.children;
  }

  return (
    <TouchableOpacity onPress={ props.onPress } style={ [styles.container, props.style] }>
      { childComponents }
    </TouchableOpacity>
  );
};

HugeButton.propTypes = {
  children: node.isRequired,
  style: oneOfType([object, number]),
  textStyle: oneOfType([object, number]),
  onPress: func
};

export default HugeButton;
