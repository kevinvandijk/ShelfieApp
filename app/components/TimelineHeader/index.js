import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const { string } = PropTypes;

const SectionHeader = (props) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>{ props.children }</Text>
    </View>
  );
};

SectionHeader.propTypes = {
  children: string.isRequired
};

export default SectionHeader;
