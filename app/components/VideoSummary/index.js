import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text } from 'react-native';
import { CustomCachedImage } from 'react-native-img-cache';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Pie';

import { getAccessToken } from '../../modules/auth';

import styles from './styles';

const { string, func } = PropTypes;

class VideoSummary extends React.Component {
  static propTypes = {
    title: string.isRequired,
    onPress: func,
    screenshotUrl: string.isRequired,
    description: string,
    accessToken: string.isRequired
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
      headers: { Authorization: `Bearer ${this.props.accessToken}` }
    };

    return (
      <TouchableOpacity style={ styles.container } onPress={ onPress } activeOpacity={ 0.75 }>
        <View style={ styles.metaInfo }>
          <Text style={ styles.title }>{ title }</Text>
          { description &&
            <Text style={ styles.description }>
              { description }
            </Text>
          }
        </View>
        <CustomCachedImage
          component={ Image }
          indicator={ Progress }
          indicatorProps={{
            color: '#E96A67'
          }}
          resizeMode="cover"
          source={ source }
          style={ [styles.image, { backgroundColor: '#efefef' }] }
          onLoad={ this.enableOverlay }
          mutable
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

const mapStateToProps = (state) => {
  return {
    accessToken: getAccessToken(state)
  };
};

export default connect(mapStateToProps)(VideoSummary);
