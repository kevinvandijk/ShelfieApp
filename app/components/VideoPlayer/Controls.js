import React, { PropTypes } from 'react';
import { View, TouchableHighlight } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
const { number, string, bool, object, oneOfType, func, array } = PropTypes;

const Controls = (props) => {
  return (
    <View style={ [styles.controlsContainer, props.style] }>
      { props.backward &&
        <TouchableHighlight onPress={ props.onBackward }>
          <Icon
            name="backward"
            size={ 11 * props.scale }
            color={ props.color }
          />
        </TouchableHighlight>
      }

      { !props.paused &&
        <TouchableHighlight onPress={ props.onPause }>
          <Icon
            name="pause"
            size={ 22 * props.scale }
            color={ props.color }
          />
        </TouchableHighlight>
      }

      { props.paused &&
        <TouchableHighlight onPress={ props.onPlay }>
          <Icon
            name="play"
            size={ 22 * props.scale }
            color={ props.color }
          />
        </TouchableHighlight>
      }

      { props.forward &&
        <TouchableHighlight onPress={ props.onForward }>
          <Icon
            name="forward"
            size={ 11 * props.scale }
            color={ props.color }
          />
        </TouchableHighlight>
      }
    </View>
  );
};

// TODO: Better proptype control:
Controls.propTypes = {
  scale: number,
  color: string,
  forward: bool,
  backward: bool,
  paused: bool,
  onBackward: func,
  onPause: func,
  onForward: func,
  onPlay: func,
  style: oneOfType([number, object, array])
};

Controls.defaultProps = {
  scale: 1,
  color: '#B2B2B2'
};

export default Controls;
