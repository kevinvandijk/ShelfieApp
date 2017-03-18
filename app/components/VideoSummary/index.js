import React, { PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import { getAuthToken } from '../../services/api';

import styles from './styles';

const { string, func } = PropTypes;

class VideoSummary extends React.Component {
  static propTypes = {
    title: string.isRequired,
    onPress: func,
    screenshotUrl: string.isRequired,
    description: string
  }

  static defaultProps = {
    description: null,
    onPress: null
  }

  state = {
    showOverlay: false
  }

  enableOverlay = () => {
    this.setState({
      showOverlay: true
    });
  }

  render() {
    const { title, description, screenshotUrl, onPress } = this.props;

    const source = {
      uri: screenshotUrl,
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    };

    return (
      <TouchableOpacity style={ styles.container } onPress={ onPress }>
        <View style={ styles.metaInfo }>
          <Text style={ styles.title }>{ title }</Text>
          { description &&
            <Text style={ styles.description }>
              { description }
            </Text>
          }
        </View>
        <Image
          resizeMode="cover"
          source={ source }
          style={ styles.image }
          onLoad={ this.enableOverlay }
        />
        { this.state.showOverlay &&
          <Image
            source={ require('../../assets/images/timeline-overlay.png') }
            style={ styles.overlay }
          />
        }
      </TouchableOpacity>
    );
  }
}

export default VideoSummary;
