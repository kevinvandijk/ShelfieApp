import { getDeviceLocale } from 'react-native-device-info';
import I18n from '../lib/i18n';

export default function i18nInitializer() {
  I18n.setTranslations({
    en: require('../../config/locales/en.json') // eslint-disable-line
  });

  I18n.switchLanguage(getDeviceLocale());
}
