import React, { PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { number, string, bool, object, oneOfType, func, array } = PropTypes;

function calculateHitSlop(size, minimalTouchArea) {
  const extraSurface = (minimalTouchArea - size) / 2;
  return {
    top: extraSurface,
    right: extraSurface,
    bottom: extraSurface,
    left: extraSurface
  };
}

const Controls = (props) => {
  return (
    <View style={ [styles.controlsContainer, props.style] }>
      { props.backward &&
        <TouchableOpacity
          hitSlop={ calculateHitSlop(props.normalButtonSize, props.minimalTouchArea) }
          onPress={ props.onBackward }
        >
          <Icon
            name="replay-10"
            size={ props.normalButtonSize }
            color={ props.color }
          />
        </TouchableOpacity>
      }

      { !props.paused &&
        <TouchableOpacity
          hitSlop={ calculateHitSlop(props.mainButtonSize, props.minimalTouchArea) }
          onPress={ props.onPause }
        >
          <Icon
            name="pause"
            size={ props.mainButtonSize }
            color={ props.color }
          />
        </TouchableOpacity>
      }

      { props.paused &&
        <TouchableOpacity
          hitSlop={ calculateHitSlop(props.mainButtonSize, props.minimalTouchArea) }
          onPress={ props.onPlay }
        >
          <Icon
            name="play-arrow"
            size={ props.mainButtonSize }
            color={ props.color }
          />
        </TouchableOpacity>
      }

      { props.forward &&
        <TouchableOpacity
          hitSlop={ calculateHitSlop(props.normalButtonSize, props.minimalTouchArea) }
          onPress={ props.onForward }
        >
          <Icon
            name="forward-10"
            size={ props.normalButtonSize }
            color={ props.color }
          />
        </TouchableOpacity>
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
  normalButtonSize: 32,
  mainButtonSize: 64,
  minimalTouchArea: 44
};

export default Controls;
