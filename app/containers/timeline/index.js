import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';
import { fetchVideos } from '../../modules/videos';
import List from '../../components/List'

class TimelineContainer extends Component {

  componentDidMount() {
    this.props.fetchVideos();
  }

  renderRow(rowData) {

  }

  render() {
    return (
      <List data={ this.props.videos }
      />
    );
  }
}

const mapDispatchToProps = {
  fetchVideos
};

const mapStateToProps = (state) => {
  return {
    videos: state.videos || []
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
