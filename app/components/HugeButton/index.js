import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default class HugeButton extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.object
  }

  render() {
    return (
      <View style={ [styles.container, this.props.style] }>
        <Text style={ styles.text }>{ this.props.children.toUpperCase() }</Text>
      </View>
    );
  }
}
