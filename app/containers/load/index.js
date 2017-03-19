import React, { Component, PropTypes } from 'react';
import { View, Image, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { initialize, getAppLoadedStatus } from '../../modules/boot';

const { func, bool } = PropTypes;

class LoadContainer extends Component {
  static propTypes = {
    initialize: func.isRequired,
    appLoaded: bool
  }

  static defaultProps = {
    appLoaded: false
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    if (!this.props.appLoaded) {
      this.props.initialize();
    }
  }

  render() {
    const { width } = Dimensions.get('window');
    const background = width > 375
      ? require('../../assets/images/background-plus.png') // eslint-disable-line
      : require('../../assets/images/background.png');

    return (
      <View style={ styles.container }>
        <View style={ styles.backgroundContainer }>
          <Image
            source={ background }
            style={ styles.backgroundImage }
          />
        </View>
        <View style={ styles.content }>
          <Image
            source={ require('../../assets/images/logo.png') }
            style={ styles.logo }
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appLoaded: getAppLoadedStatus(state)
  }
}
const mapDispatchToProps = {
  initialize
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadContainer);
