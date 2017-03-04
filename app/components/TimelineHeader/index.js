import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { getActiveTimelineSection } from '../../modules/timeline';

const { string } = PropTypes;

function test(options) {
  // console.log('yay', options.nativeEvent.layout.y);
}

const TimelineHeader = (props) => {
  const isActiveSection = props.activeSection === props.children;

  return (
    <View onLayout={ test } style={ [styles.container, isActiveSection && styles.containerActive] }>
      <Text style={ isActiveSection ? styles.activeText : styles.text }>
        { props.children }
      </Text>
      {/* { props.activeSection === props.children &&
        <Text>JAJA</Text>
      } */}
    </View>
  );
};

TimelineHeader.propTypes = {
  children: string.isRequired,
  activeSection: string
};

TimelineHeader.defaultProps = {
  activeSection: null
};

const mapStateToProps = (state) => {
  return {
    activeSection: getActiveTimelineSection(state)
  };
};

export default connect(mapStateToProps)(TimelineHeader);
