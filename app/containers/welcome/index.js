import React from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';

import { AUTH_SCENE } from '../../router';
import I18n from '../../lib/i18n';
import styles from './styles';
import TextContent from '../../components/TextContent';
import HugeButton from '../../components/HugeButton';

const translate = I18n.namespace('containers.welcome');

function navigateToLogin() {
  Actions[AUTH_SCENE]();
}

const WelcomeContainer = () => {
  return (
    <View style={ styles.container }>
      <View style={ styles.backgroundContainer }>
        <LinearGradient colors={ ['#E96A67', '#FF5757'] } style={ styles.backgroundGradient } />
      </View>
      <View style={ styles.content }>
        <Image
          source={ require('../../assets/images/logo.png') }
          style={ styles.logo }
        />
        <TextContent
          i18nKey={ `containers.welcome.${DeviceInfo.isTablet ? 'introTablet' : 'introPhone'}` }
          style={ styles.introText }
        />
      </View>
      <View style={ styles.buttonsContainer }>
        <HugeButton
          style={ styles.button }
          textStyle={ styles.buttonText }
          onPress={ navigateToLogin }
        >
          { translate('signIn') }
        </HugeButton>
      </View>
    </View>
  );
};

export default WelcomeContainer;
