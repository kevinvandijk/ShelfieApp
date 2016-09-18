import React, { PropTypes } from 'react';
import { View, Animated, Easing, StyleSheet, Text, Slider } from 'react-native';
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
    easing: func,
    easingDuration: number,
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
    easing: Easing.inOut(Easing.ease),
    easingDuration: 150,
    currentTime: 0,
    duration: 0
  }

  constructor(props) {
    super();
    this.progressWidth = new Animated.Value(props.currentTime || 0);
  }

  state = {
    progress: new Animated.Value(0)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.disableSeek) {
      const style = StyleSheet.flatten(nextProps.style);
      if (nextProps.currentTime !== this.props.currentTime) {
        const progress = nextProps.currentTime / nextProps.duration;
        const width = style.width * progress;
        this.animate(width);
      }
    }
  }

  animate(width) {
    Animated.timing(this.progressWidth, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: width
    }).start();
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


        { disableSeek ?
          <View style={ styles.progressBarContainer }>
            <Animated.View style={ [styles.progressBar, { width: this.progressWidth }] } />
          </View>
          :
          <Slider
            maximumValue={ duration }
            value={ currentTime }
            onValueChange={ this.props.onSeek }
            onSlidingComplete={ this.props.onSeekComplete }
          />
        }
      </View>
    );
  }
}

export default Progress;
