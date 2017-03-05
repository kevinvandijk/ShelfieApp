import React, { Component, PropTypes } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';
import { debounce, defer } from 'lodash';

import config from '../../../config';
import authenticatedComponent from '../../decorators/AuthenticatedComponent';
import { fetchVideos, getVideosByYear } from '../../modules/videos';
import { setActiveTimelineSection, getActiveTimelineSection } from '../../modules/timeline';
import List from '../../components/List';
import TimelineHeader from '../../components/TimelineHeader';
import VideoSummary from '../../components/VideoSummary';

const { func, shape } = PropTypes;

@authenticatedComponent()
class TimelineContainer extends Component {
  static propTypes = {
    fetchVideos: func.isRequired,
    videos: shape({}),
    setActiveTimelineSection: func.isRequired
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    this.props.fetchVideos();

    this.debouncedStatus = debounce((activeSection) => {
      this.props.setActiveTimelineSection(activeSection);
    }, 100);

    this.props.setActiveTimelineSection('1989');
  }

  onRefresh = () => {
    this.props.fetchVideos();
  }

  onChangeVisibleRows = (visibleRows) => {
    const activeSection = Object.keys(visibleRows)[0];

    // Wait for callstack to complete to try and mitigate twitchiness
    defer(this.props.setActiveTimelineSection, activeSection);
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

  navigateToVideo = (video) => {
    Actions.mainWatch({ videoId: video.id });
  }

  renderSectionHeader = (sectionData, sectionId) => {
    return <TimelineHeader key={ sectionId }>{ sectionId }</TimelineHeader>;
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
        headerComponent={ TimelineHeader }
        rowComponent={ VideoSummary }
        rowDataGetter={ this.getRowData }
        onRowPress={ this.navigateToVideo }
        onRefresh={ this.onRefresh }
        onChangeVisibleRows={ this.onChangeVisibleRows }
        renderSectionHeader={ this.renderSectionHeader }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: getVideosByYear(state),
    activeSection: getActiveTimelineSection(state)
  };
};

const mapDispatchToProps = {
  fetchVideos,
  setActiveTimelineSection
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
