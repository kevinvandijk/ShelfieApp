/* eslint-disable */
import I18n from 'react-native-i18n';
import { getDeviceLocale } from 'react-native-device-info';

export default function i18nInitializer() {
  I18n.fallbacks = true;
  I18n.locales = {
    en: require('../../config/locales/en.json')
  };

  I18n.defaultLocale = 'en-US';
  // There's a bug in react-native-i18n that takes the devices country instead of locales
  // so use DeviceInfo instead. More info: https://github.com/AlexanderZaytsev/react-native-i18n/issues/18
  I18n.locale = getDeviceLocale();
}
