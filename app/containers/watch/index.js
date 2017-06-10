import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { getVideo, fetchSignedOutputUrl, getSignedUrlForQuality } from '../../modules/videos';
import Orientation from 'react-native-orientation';

import VideoPlayer from '../../components/VideoPlayer';

const { string, shape, func } = PropTypes;

class WatchContainer extends Component {
  static propTypes = {
    fetchSignedOutputUrl: func.isRequired,
    videoId: string.isRequired,
    video: shape({}).isRequired,
    videoUrl: string
  }

  state = {
    fullscreen: false
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this.onOrientationChange);

    this.props.fetchSignedOutputUrl(this.props.videoId, '360p_mp4');
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  onFullscreenPress = () => {
    Orientation.lockToLandscape();
    Orientation.unlockAllOrientations();
  }

  onFullscreenExitPress = () => {
    Orientation.lockToPortrait();
    Orientation.unlockAllOrientations();
  }

  onOrientationChange = (orientation) => {
    if (orientation !== 'PORTRAIT') {
      StatusBar.setHidden(true);
    } else {
      StatusBar.setHidden(false);
    }

    this.setState({
      fullscreen: orientation !== 'PORTRAIT'
    });
  }

  render() {
    const { video } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        { this.props.videoUrl &&
          <VideoPlayer
            title={ video.title }
            url={ this.props.videoUrl }
            fullscreen={ this.state.fullscreen }
            onFullscreenPress={ this.onFullscreenPress }
            onFullscreenExitPress={ this.onFullscreenExitPress }
          />
        }
      </View>

    );
  }
}

const mapDispatchToProps = {
  fetchSignedOutputUrl
};

const mapStateToProps = (state, ownProps) => {
  return {
    video: getVideo(state, ownProps.videoId),
    videoUrl: getSignedUrlForQuality(state, ownProps.videoId, '360p_mp4')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchContainer);
