import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { initialize } from '../../modules/boot';

const { func } = PropTypes;

class LoadContainer extends Component {
  static propTypes = {
    initialize: func.isRequired
  }

  componentWillMount() {
    this.props.initialize();
  }

  render() {
    return (
      <View>
        <Text>LOADING...</Text>
      </View>
    );
  }
}

const mapDispatchToProps = {
  initialize
};

export default connect(null, mapDispatchToProps)(LoadContainer);
