import React, { Component, PropTypes } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { initialize } from '../../modules/boot';

const { func } = PropTypes;

class LoadContainer extends Component {
  static propTypes = {
    initialize: func.isRequired
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    this.props.initialize();
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.backgroundContainer }>
          <Image
            source={ require('../../assets/images/splashscreen.png') }
            style={ styles.backgroundImage }
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  initialize
};

export default connect(null, mapDispatchToProps)(LoadContainer);
