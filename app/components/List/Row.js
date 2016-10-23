import React, { PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';
const { string, func } = PropTypes;

const Row = (props) => {
  return (
    <TouchableOpacity style={ styles.rowContainer } onPress={ props.onPress }>
      <Text style={ styles.rowText }>{ props.content }</Text>
    </TouchableOpacity>
  );
};

Row.propTypes = {
  content: string.isRequired,
  onPress: func
};

export default Row;
