import React from 'react';
import { Animated } from 'react-native';

class ThumbnailLoader extends React.Component {
  state = {
    color: new Animated.Value(0)
  }

  componentDidMount() {
    this.cycle();
  }

  cycle() {
    const duration = 750;

    Animated.sequence([
      Animated.timing(
        this.state.color,
        {
          toValue: 1,
          duration
        }
      ),

      Animated.timing(
        this.state.color,
        {
          toValue: 0,
          duration
        }
      )
    ]).start((animation) => {
      if (animation.finished) this.cycle();
    });
  }

  render() {
    const style = {
      flex: 1,
      backgroundColor: this.state.color.interpolate({
        inputRange: [0, 1],
        outputRange: ['#EBEBEB', '#D8D8D8']
      }),
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };

    return <Animated.View style={ style } />;
  }
}

export default ThumbnailLoader;
