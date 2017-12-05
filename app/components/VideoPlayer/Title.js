import React from 'react';
import { string, number, object, array, oneOfType } from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

const Title = (props) => {
  return (
    <View style={ [styles.titleContainer, props.style] }>
      <Text
        numberOfLines={ 1 }
        ellipsizeMode="tail"
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
