import DeviceInfo from 'react-native-device-info';
import Raven from 'raven-js';
import config from '../../config';

require('raven-js/plugins/react-native')(Raven);
const revision = require('../../config/revision.json');

function sentryInitializer() {
  if (__DEV__ || (process.env && process.env.NODE_ENV === 'development')) return null;

  const rev = revision.revision.length ? revision.revision : 'development';
  const release = `${DeviceInfo.getReadableVersion()}.${rev}`;
  Raven
    .config(config.get('sentry.dsn'), { release })
    .install();

  Raven.setTagsContext({
    manufacturer: DeviceInfo.getManufacturer(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    os: `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
    locale: DeviceInfo.getDeviceLocale(),
    country: DeviceInfo.getDeviceCountry()
  });

  Raven.setExtraContext({
    'Device ID': DeviceInfo.getDeviceId(),
    'Device Unique ID': DeviceInfo.getUniqueID(),
    'Device Name': DeviceInfo.getDeviceName(),
  });

  const originalHandler = global.ErrorUtils.getGlobalHandler();
  function errorHandler(e, isFatal) {
    Raven.captureException(e, { isFatal });

    if (isFatal) {
      // originalHandler(e, isFatal);
    }
  }

  global.ErrorUtils.setGlobalHandler(errorHandler);

  return Raven;
}

export default sentryInitializer();
