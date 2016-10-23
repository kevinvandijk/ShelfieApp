import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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

  render() {
    return (
      <List data={ this.props.videos } rowDataGetter={ this.getRowText } />
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
