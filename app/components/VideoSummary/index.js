import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text } from 'react-native';
import { CustomCachedImage } from 'react-native-img-cache';
import Image from 'react-native-image-progress';

import ThumbnailLoader from '../../components/ThumbnailLoader';
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
    imageLoaded: false
  }

  setImageLoaded = () => {
    this.setState({
      imageLoaded: true
    });
  }

  render() {
    const { title, description, screenshotUrl, onPress } = this.props;

    const source = {
      uri: screenshotUrl,
      headers: { Authorization: `Bearer ${this.props.accessToken}` }
    };

    const containerStyle = [styles.container];
    if (this.state.imageLoaded) containerStyle.push(styles.containerLoaded);

    return (
      <TouchableOpacity style={ containerStyle } onPress={ onPress } activeOpacity={ 0.75 }>
        <CustomCachedImage
          component={ Image }
          indicator={ ThumbnailLoader }
          resizeMode="cover"
          source={ source }
          style={ styles.image }
          onLoad={ this.setImageLoaded }
          mutable
        />
        { this.state.imageLoaded &&
          <Image
            source={ require('../../assets/images/timeline-overlay.png') }
            style={ styles.overlay }
          />
        }
        { this.state.imageLoaded &&
          <View style={ styles.metaInfo }>
            <Text style={ styles.title }>{ title }</Text>
            { description &&
              <Text style={ styles.description }>
                { description }
              </Text>
            }
          </View>
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
