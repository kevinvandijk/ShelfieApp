import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const { oneOfType, object, number, func, node, bool } = PropTypes;

const HugeButton = (props) => {
  let childComponents;
  if (typeof props.children === 'string') {
    childComponents = (
      <Text style={ [styles.text, props.textStyle, props.disabled ? styles.textDisabled : null] }>
        { props.children.toUpperCase() }
      </Text>
    );
  } else {
    // Todo: pass props to child components
    childComponents = props.children;
  }

  const style = [styles.container, props.style];
  if (props.disabled) {
    style.push(styles.containerDisabled);
  }
  return (
    <TouchableOpacity onPress={ props.onPress } disabled={ props.disabled } style={ style }>
      { childComponents }
    </TouchableOpacity>
  );
};

HugeButton.propTypes = {
  children: node.isRequired,
  style: oneOfType([object, number]),
  textStyle: oneOfType([object, number]),
  onPress: func,
  disabled: bool
};

export default HugeButton;
