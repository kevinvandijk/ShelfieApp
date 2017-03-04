import React, { PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import { getAuthToken } from '../../services/api';

import styles from './styles';

const { string, func } = PropTypes;

const VideoSummary = (props) => {
  const source = {
    uri: props.screenshotUrl,
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  };

  return (
    <TouchableOpacity style={ styles.container } onPress={ props.onPress }>
      <View style={ styles.metaInfo }>
        <Text style={ styles.title }>{ props.title }</Text>
        <Text style={ styles.description }>
          { props.description }
        </Text>
      </View>
      <Image resizeMode="cover" source={ source } style={ styles.image } />
      <Image
        resizeMode="cover"
        source={ require('../../assets/images/timeline-overlay.png') }
        style={ styles.overlay }
      />
    </TouchableOpacity>
  );


};

VideoSummary.propTypes = {
  title: string.isRequired,
  onPress: func,
  screenshotUrl: string.isRequired,
  description: string.isRequired
};

export default VideoSummary;
