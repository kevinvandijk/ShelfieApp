import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import AuthenticatedComponent from '../../decorators/AuthenticatedComponent';
import { fetchVideos, getVideosById } from '../../modules/videos';
import List from '../../components/List';

const { func, shape } = PropTypes;

@AuthenticatedComponent()
class TimelineContainer extends Component {
  static propTypes = {
    fetchVideos: func.isRequired,
    videos: shape({})
  }

  componentDidMount() {
    this.props.fetchVideos();
  }

  getRowText(rowData) {
    return rowData.title;
  }

  navigateToVideo(video) {
    Actions.mainWatch({ videoId: video.id });
  }

  render() {
    return (
      <List
        data={ this.props.videos }
        rowDataGetter={ this.getRowText }
        onRowPress={ this.navigateToVideo }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: getVideosById(state)
  };
};

const mapDispatchToProps = {
  fetchVideos
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
