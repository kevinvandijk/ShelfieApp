import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const { string, number, object, array, oneOfType } = PropTypes;

const Title = (props) => {
  return (
    <View style={ [styles.titleContainer, props.style] }>
      <Text
        numberOfLines={ 1 }
        ellipsizeMode="middle"
        adjustsFontSizeToFit
        style={ styles.titleText }
      >
        { props.children }
      </Text>
    </View>
  );
};

Title.propTypes = {
  children: string,
  style: oneOfType([number, object, array])
};

export default Title;
