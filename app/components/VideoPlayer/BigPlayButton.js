import React, { PropTypes } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const { func, string, number, oneOfType, object, array } = PropTypes;

const BigPlayButton = (props) => {
  return (
    <View style={ props.style }>
      <TouchableWithoutFeedback onPress={ props.onPress }>
        <Icon
          name="play-circle"
          size={ props.size }
          color={ props.color }
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

BigPlayButton.propTypes = {
  onPress: func.isRequired,
  color: string,
  size: number,
  style: oneOfType([number, object, array])
};

BigPlayButton.defaultProps = {
  color: '#E24546',
  size: 94
};

export default BigPlayButton;
