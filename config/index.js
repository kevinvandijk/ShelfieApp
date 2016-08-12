import Immutable from 'seamless-immutable';
import { get, isUndefined } from 'lodash';
const defaultConfig = require('./default.json');
// eslint-disable-next-line global-require
const localConfig = __DEV__ ? require('./development.json') : require('./production.json');

const composedConfig = Immutable.from({
  ...defaultConfig,
  ...localConfig
});

class Config {
  get(path) {
    const value = get(composedConfig, path);
    if (isUndefined(value)) {
      throw new Error(`No config value found for '${path}'`);
    }
    return value;
  }
}

export default new Config();
