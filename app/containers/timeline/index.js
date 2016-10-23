import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { fetchVideos, getVideosById } from '../../modules/videos';
import List from '../../components/List';
const { func, shape } = PropTypes;

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
    Actions.mainWatch(video.id);
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

const mapDispatchToProps = {
  fetchVideos
};

const mapStateToProps = (state) => {
  return {
    videos: getVideosById(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
