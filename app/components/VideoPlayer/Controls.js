import React, { PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { calculateHitSlop } from '../../helpers';
import ControlButton from './ControlButton';

const { number, string, bool, object, oneOfType, func, array } = PropTypes;

const Controls = (props) => {
  return (
    <View style={ props.style }>
      { props.backward &&
        <ControlButton
          size={ props.normalButtonSize }
          hitSlop={ props.minimalTouchArea }
          onPress={ props.onBackward }
          name="fast-rewind"
          color={ props.color }
        />
      }

      <ControlButton
        size={ props.mainButtonSize }
        hitSlop={ props.minimalTouchArea }
        onPress={ props.paused ? props.onPlay : props.onPause }
        name={ props.paused ? 'play-arrow' : 'pause' }
        color={ props.color }
      />

      { props.forward &&
        <ControlButton
          size={ props.normalButtonSize }
          hitSlop={ props.minimalTouchArea }
          onPress={ props.onForward }
          name="fast-forward"
          color={ props.color }
        />
      }
    </View>
  );
};

// TODO: Better proptype control:
Controls.propTypes = {
  color: string.isRequired,
  forward: bool,
  backward: bool,
  paused: bool,
  onBackward: func,
  onPause: func,
  onForward: func,
  onPlay: func,
  normalButtonSize: number.isRequired,
  mainButtonSize: number.isRequired,
  minimalTouchArea: number.isRequired,
  style: oneOfType([number, object, array])
};

Controls.defaultProps = {
  color: '#B2B2B2',
  normalButtonSize: 45,
  mainButtonSize: 92,
  minimalTouchArea: 44,
  forward: true,
  backward: true,
  paused: false,
  onBackward: null,
  onPause: null,
  onForward: null,
  onPlay: null,
  style: null
};

export default Controls;
