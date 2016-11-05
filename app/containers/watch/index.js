import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { getVideo, fetchSignedOutputUrl, getSignedUrlForQuality } from '../../modules/videos';

import VideoPlayer from '../../components/VideoPlayer';

const { string, shape, func } = PropTypes;

class WatchContainer extends Component {
  static propTypes = {
    fetchSignedOutputUrl: func.isRequired,
    videoId: string.isRequired,
    video: shape({}).isRequired,
    videoUrl: string
  }

  componentDidMount() {
    this.props.fetchSignedOutputUrl(this.props.videoId, '360p-mp4');
  }

  render() {
    const { video } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }}>
        { this.props.videoUrl &&
          <VideoPlayer
            title={ video.title }
            url={ this.props.videoUrl }
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
    videoUrl: getSignedUrlForQuality(state, ownProps.videoId, '360p-mp4')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchContainer);
