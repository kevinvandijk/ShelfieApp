import React, { Component, PropTypes } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';

import authenticatedComponent from '../../decorators/AuthenticatedComponent';
import { fetchVideos, getVideosByYear } from '../../modules/videos';
import List from '../../components/List';

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

  getRowText(rowData) {
    return rowData.title;
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
        rowDataGetter={ this.getRowText }
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
