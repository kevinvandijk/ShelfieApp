import { getDeviceLocale } from 'react-native-device-info';
import Immutable from 'seamless-immutable';
import { get, uniq } from 'lodash';

const _private = {
  language: getDeviceLocale().toLowerCase()
};

export default {
  setTranslations(translations) {
    _private.translations = translations;
    _private.fallback = (this.getLanguage().match(/-/)
      ? this.getLanguage().split('-')[0]
      : null
    );
    this.setLanguage(this.getLanguage());
  },

  setLanguage(language) {
    const translations = _private.translations;

    if (!translations[language] && !translations[this.getFallback()]) {
      throw new Error(`No translations found for language ${language}`);
    }

    let precompiledTranslations;
    const localTranslations = Immutable.from(translations[language]);

    const fallback = this.getFallback();
    if (fallback) {
      const fallbackTranslations = Immutable.from(
        translations[fallback] || {}
      );

      precompiledTranslations = (localTranslations
        ? fallbackTranslations.merge(localTranslations, { deep: true })
        : fallbackTranslations
      );
    } else {
      precompiledTranslations = localTranslations || Immutable.from({});
    }


    _private.precompiledTranslations = precompiledTranslations;
  },

  getLanguage() {
    return _private.language;
  },

  getFallback() {
    return _private.fallback;
  },

  format(key, interpolationValues = {}) {
    let translation = get(_private.precompiledTranslations, key);
    if (!translation) throw new Error(`No translation found for key ${this.getLanguage()}.${key}`);

    const interpolationKeys = uniq(translation.match(/%\{\w*\}/g)).map(intKey =>
      intKey.replace(/%\{|\}/g, '')
    );

    interpolationKeys.forEach(intKey => {
      if (typeof interpolationValues[intKey] === 'undefined') {
        throw new Error(`No value given for %{${intKey}} in ${this.getLanguage()}.${key}`);
      }

      const value = interpolationValues[intKey] || ''; // Allow null or false values
      const regex = new RegExp(`%{${intKey}}`, 'g');
      translation = translation.replace(regex, value);
    });

    return translation;
  }
};
