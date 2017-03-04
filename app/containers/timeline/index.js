import React, { Component, PropTypes } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';

import config from '../../../config';
import authenticatedComponent from '../../decorators/AuthenticatedComponent';
import { fetchVideos, getVideosByYear } from '../../modules/videos';
import List from '../../components/List';
import VideoSummary from '../../components/VideoSummary';

const { func, shape } = PropTypes;

@authenticatedComponent()
class TimelineContainer extends Component {
  static propTypes = {
    fetchVideos: func.isRequired,
    videos: shape({})
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    this.props.fetchVideos();
  }

  onRefresh = () => {
    this.props.fetchVideos();
  }

  getRowData = (rowData) => {
    return {
      content: rowData.title,
      title: rowData.title,
      description: 'Here will be a description',
      id: rowData.id,
      screenshotUrl: `${config.get('api.baseURL')}/v1/videos/${rowData.id}/thumbnail`
    };
  }

  navigateToVideo(video) {
    Actions.mainWatch({ videoId: video.id });
  }

  render() {
    if (!this.props.videos) {
      return (
        <View style={{ flex: 1, top: 30, alignItems: 'center' }}>
          <Spinner type="ThreeBounce" color="#ED9090" />
        </View>
      );
    }

    return (
      <List
        data={ this.props.videos }
        rowComponent={ VideoSummary }
        rowDataGetter={ this.getRowData }
        onRowPress={ this.navigateToVideo }
        onRefresh={ this.onRefresh }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: getVideosByYear(state)
  };
};

const mapDispatchToProps = {
  fetchVideos
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
