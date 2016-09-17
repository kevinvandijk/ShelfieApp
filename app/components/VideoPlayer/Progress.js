import React, { PropTypes } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import styles from './styles';
const { number, oneOfType, object, func, array } = PropTypes;

// TODO: Fix proptype for style, it always needs a width!
class Progress extends React.Component {
  static propTypes = {
    easing: func,
    easingDuration: number,
    currentTime: number.isRequired,
    duration: number.isRequired,
    style: oneOfType([number, object, array]).isRequired
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
    const style = StyleSheet.flatten(nextProps.style);
    if (nextProps.currentTime !== this.props.currentTime) {
      const progress = nextProps.currentTime / nextProps.duration;
      const width = style.width * progress;
      this.animate(width);
    }
  }

  animate(width) {
    Animated.timing(this.progressWidth, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: width
    }).start();
  }

  render() {
    return (
      <View style={ [styles.progressContainer, this.props.style] }>
        <Animated.View style={ [styles.progressBar, { width: this.progressWidth }] } />
      </View>
    );
  }
}

export default Progress;
