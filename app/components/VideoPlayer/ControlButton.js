import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { calculateHitSlop } from '../../helpers';

const ControlButton = (props) => {
  const { onPress, name, size, hitSlop, iconStyle, color } = props;

  return (
    <TouchableOpacity
      style={ styles.videoButtonTouchable }
      hitSlop={ calculateHitSlop(size, hitSlop) }
      onPress={ onPress }
    >
      <Icon
        name={ name }
        size={ size }
        style={ [styles.videoIcons, iconStyle] }
        color={ color }
      />
    </TouchableOpacity>
  );
};

ControlButton.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  hitSlop: PropTypes.number,
  color: PropTypes.string
};

ControlButton.defaultProps = {
  onPress: null,
  size: 24,
  hitSlop: 44,
  color: '#FFFFFF'
};

export default ControlButton;
