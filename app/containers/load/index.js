import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { View, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import { initialize, getAppLoadedStatus } from '../../modules/boot';

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
//
    if (!this.props.appLoaded) {
      this.props.initialize();
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.backgroundContainer }>
          <LinearGradient colors={ ['#E96A67', '#FF5757'] } style={ styles.backgroundGradient } />
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
