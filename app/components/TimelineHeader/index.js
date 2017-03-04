import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { getActiveTimelineSection, getPreviousTimelineSection } from '../../modules/timeline';

const { string, bool } = PropTypes;

class TimelineHeader extends React.Component {
  static propTypes = {
    children: string.isRequired,
    isActive: bool
  }

  static defaultProps = {
    activeSection: null,
    isActive: false
  }

  componentWillReceiveProps(nextProps) {
    // Keep small height when scrolling to top, go back to big size when scrolling back down:
    // TODO: Fix this up with proper ids, not by looking at the children and weird stuff like that:
    if (this.props.isActive && !nextProps.isActive) {
      if (parseInt(nextProps.previousSection, 10) < parseInt(nextProps.activeSection, 10)) {
        this.keepActive = true;
      } else {
        this.keepActive = false;
      }
    }
  }

  render() {
    const isActiveSection = this.keepActive || this.props.isActive;

    return (
      <View style={ [styles.container, isActiveSection && styles.containerActive] }>
        <Text style={ [styles.text, isActiveSection && styles.activeText] }>
          { this.props.children }
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeSection: getActiveTimelineSection(state),
    isActive: getActiveTimelineSection(state) === ownProps.children,
    previousSection: getPreviousTimelineSection(state)
  };
};

export default connect(mapStateToProps)(TimelineHeader);
