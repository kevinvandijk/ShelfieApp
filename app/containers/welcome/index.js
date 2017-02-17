import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

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
  StatusBar.setHidden(true);

  return (
    <View style={ styles.container }>
      <View style={ styles.backgroundContainer }>
        <Image
          source={ require('../../assets/images/background.png') }
          style={ styles.backgroundImage }
        />
      </View>
      <View style={ styles.content }>
        <Image
          source={ require('../../assets/images/logo.png') }
          style={ styles.logo }
        />
        <TextContent
          i18nKey="containers.welcome.intro"
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
        <HugeButton style={ styles.button } textStyle={ styles.buttonText }>
          { translate('dropOffPoints') }
        </HugeButton>
      </View>
    </View>
  );
};

export default WelcomeContainer;
