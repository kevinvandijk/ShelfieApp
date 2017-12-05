import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import { NavBar } from 'react-native-router-flux';

import { isWatchingFullscreen } from '../../modules/watch';

const OrientationAwareNavBar = (props) => {
  const navBarProps = (props.fullscreen
    // Hide bavbar when fullscreen prop is true
    ? { ...props, navigationBarStyle: { opacity: 0 } }
    : props
  );

  return <NavBar { ...navBarProps } />;
};

OrientationAwareNavBar.propTypes = {
  fullscreen: bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    fullscreen: isWatchingFullscreen(state)
  };
};

export default connect(mapStateToProps)(OrientationAwareNavBar);
