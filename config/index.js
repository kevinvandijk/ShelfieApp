import Immutable from 'seamless-immutable';
import { get, isUndefined } from 'lodash';

const defaultConfig = require('./default.json');
// eslint-disable-next-line global-require
const localConfig = __DEV__ ? require('./development.json') : require('./production.json');

const composedConfig = Immutable.from({
  ...defaultConfig,
  ...localConfig
});

// TODO: memoize results
class Config {
  get(path) {
    let value = get(composedConfig, path);
    // Try one more time in default config
    // TODO: Make deep merge to not have to do 2 lookups
    if (isUndefined(value)) {
      value = get(defaultConfig, path);
      if (isUndefined(value)) throw new Error(`No config value found for '${path}'`);
    }

    return value;
  }
}

export default new Config();
