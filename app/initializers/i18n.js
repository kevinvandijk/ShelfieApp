import { getDeviceLocale } from 'react-native-device-info';
import I18n from '../lib/i18n';

export default function i18nInitializer() {
  I18n.setTranslations({
    en: require('../../config/locales/en.json'),
    nl: require('../../config/locales/nl.json')
  });

  // FIXME: Hardcoded to nl for now
  I18n.switchLanguage('nl');
  // I18n.switchLanguage(getDeviceLocale());
}
