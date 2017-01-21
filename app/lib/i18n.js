import Immutable from 'seamless-immutable';
import { get, uniq } from 'lodash';

const _private = {
  fallback: 'en'
};

export default {
  setTranslations(translations, options = {}) {
    _private.translations = translations;
    if (options.fallback) this.setFallback(options.fallback);
  },

  switchLanguage(locale) {
    const language = locale.toLowerCase();
    _private.language = language;

    const translations = _private.translations;
    const fallbacks = this.getFallbacks().reverse();

    const precompiledTranslations = fallbacks.reduce((precompiled, lang) => {
      return precompiled.merge(translations[lang] || {}, { deep: true });
    }, Immutable.from({}));

    _private.precompiledTranslations = precompiledTranslations;
  },

  getLanguage() {
    return _private.language || '';
  },

  setFallback(lang) {
    _private.fallback = lang;
  },

  getFallbacks() {
    const language = this.getLanguage();
    const fallbacks = [language];

    if (this.getLanguage().match(/-/)) {
      fallbacks.push(this.getLanguage().split('-')[0]);
    }

    if (_private.fallback) {
      const translations = _private.translations;
      const fallbackLang = _private.fallback;

      if (!translations[fallbackLang]) {
        throw new Error(`No translations found for fallback language ${fallbackLang}`);
      }
      fallbacks.push(fallbackLang);
    }

    return fallbacks;
  },

  t(key, interpolationValues = {}) {
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
  },

  namespace(baseKey) {
    return (key, interpolationValues) => {
      return this.t(`${baseKey}.${key}`, interpolationValues);
    };
  }
};
