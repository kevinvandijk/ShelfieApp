import React, { PropTypes } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const { func, string, number, oneOfType, object, array } = PropTypes;

const BigPlayButton = (props) => {
  return (
    <View style={ props.style }>
      <TouchableOpacity onPress={ props.onPress }>
        <Icon
          name="play-circle"
          size={ props.size }
          color={ props.color }
        />
      </TouchableOpacity>
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
  color: '#FFF',
  size: 90
};

export default BigPlayButton;
