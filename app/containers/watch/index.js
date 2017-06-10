import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { getVideo, fetchSignedOutputUrl, getSignedUrlForQuality } from '../../modules/videos';
import Orientation from 'react-native-orientation';

import { orientationChanged, isWatchingFullscreen, startWatchingOrientation, stopWatchingOrientation } from '../../modules/watch';
import VideoPlayer from '../../components/VideoPlayer';

const { string, shape, func, bool } = PropTypes;

class WatchContainer extends Component {
  static propTypes = {
    fetchSignedOutputUrl: func.isRequired,
    videoId: string.isRequired,
    video: shape({}).isRequired,
    videoUrl: string,
    orientationChanged: func.isRequired,
    fullscreen: bool.isRequired,
    startWatchingOrientation: func.isRequired,
    stopWatchingOrientation: func.isRequired
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
    this.props.startWatchingOrientation();
    StatusBar.setHidden(this.props.fullscreen);

    this.props.fetchSignedOutputUrl(this.props.videoId, '360p_mp4');
  }

  componentWillUpdate(nextProps) {
    if (nextProps.fullscreen !== this.props.fullscreen) {
      StatusBar.setHidden(!this.props.fullscreen);
    }
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    this.props.stopWatchingOrientation();
  }

  onFullscreenPress = () => {
    Orientation.lockToLandscape();
    Orientation.unlockAllOrientations();
  }

  onFullscreenExitPress = () => {
    Orientation.lockToPortrait();
    Orientation.unlockAllOrientations();
  }

  render() {
    const { video } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        { this.props.videoUrl &&
          <VideoPlayer
            title={ video.title }
            url={ this.props.videoUrl }
            fullscreen={ this.props.fullscreen }
            onFullscreenPress={ this.onFullscreenPress }
            onFullscreenExitPress={ this.onFullscreenExitPress }
          />
        }
      </View>

    );
  }
}

const mapDispatchToProps = {
  fetchSignedOutputUrl,
  orientationChanged,
  startWatchingOrientation,
  stopWatchingOrientation
};

const mapStateToProps = (state, ownProps) => {
  const fullscreen = isWatchingFullscreen(state);

  return {
    fullscreen,
    video: getVideo(state, ownProps.videoId),
    videoUrl: getSignedUrlForQuality(state, ownProps.videoId, '360p_mp4')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchContainer);
