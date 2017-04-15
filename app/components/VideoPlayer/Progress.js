import React, { PropTypes } from 'react';
import { View, StyleSheet, Text, Slider } from 'react-native';
import styles from './styles';

const { number, oneOfType, object, func, array, bool } = PropTypes;

const validateOnSeekProp = (props) => {
  if (!props.disableSeek && !props.onSeek) {
    return new Error('Prop `onSeek` is required when seeking is not disabled');
  }

  return (typeof props.onSeek !== 'function'
    ? new Error('Prop `onSeek` should be a function')
    : null
  );
};

// TODO: Fix proptype for style, it always needs a width!
class Progress extends React.Component {
  static propTypes = {
    currentTime: number.isRequired,
    duration: number.isRequired,
    style: oneOfType([number, object, array]).isRequired,
    disableTotal: bool,
    disablePlayed: bool,
    disableSeek: bool,
    onSeek: validateOnSeekProp,
    onSeekComplete: func
  }

  static defaultProps = {
    currentTime: 0,
    duration: 0
  }

  formatSeconds(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);

    return (seconds < 3600
      ? date.toISOString().substr(14, 5)
      : date.toISOString().substr(11, 8)
    );
  }

  render() {
    const { disableTotal, disablePlayed, currentTime, duration, style, disableSeek } = this.props;

    return (
      <View style={ style }>
        { !(disableTotal && disablePlayed) &&
          <View style={ styles.progressTextContainer }>
            { !disablePlayed &&
              <Text style={ styles.progressText }>
                { this.formatSeconds(currentTime) }
              </Text>
            }

            { !disableTotal &&
              <Text style={ styles.progressText }>
                { this.formatSeconds(duration) }
              </Text>
            }
          </View>
        }

        <Slider
          disabled={ disableSeek }
          thumbImage={ require('../../assets/images/progress-bar-thumb.png') }
          trackImage={ require('../../assets/images/line.png') }
          thumbTintColor="#E96767"
          maximumValue={ duration }
          value={ currentTime }
          onValueChange={ this.props.onSeek }
          onSlidingComplete={ this.props.onSeekComplete }
          style={ styles.slider }
        />
      </View>
    );
  }
}

export default Progress;
