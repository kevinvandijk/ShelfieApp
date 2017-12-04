import React from 'react';
import { oneOfType, bool, number, object, node } from 'prop-types';
import { Animated } from 'react-native';
import { omit } from 'lodash';

import styles from './styles';

class Overlay extends React.Component {
  static propTypes = {
    hidden: bool,
    style: oneOfType([number, object]),
    children: node.isRequired
  }

  static defaultProps = {
    hidden: false,
    style: null
  }

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(props.hidden ? 0 : 1)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hidden !== this.props.hidden) {
      this.state.opacity.stopAnimation();
      Animated.timing(
        this.state.opacity,
        {
          toValue: nextProps.hidden ? 0 : 1,
          duration: 400,
          useNativeDriver: true
        }
      ).start();
    }
  }

  render() {
    const { children, style, hidden } = this.props;
    const { opacity } = this.state;

    const fadeStyle = {
      opacity
    };

    return (
      <Animated.View
        style={ [styles.overlay, style, fadeStyle] }
        pointerEvents={ hidden ? 'none' : 'box-none' }
        { ...omit(this.props, ['children', 'style']) }
      >
        { children }
      </Animated.View>
    );
  }
}

export default Overlay;
