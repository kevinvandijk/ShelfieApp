import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import config from '../../config';

const Raven = require('raven-js');
require('raven-js/plugins/react-native')(Raven);
const revision = require('../../config/revision.json');

function sentryInitializer() {
  if (__DEV__ || (process.env && process.env.NODE_ENV === 'development')) return null;


  const rev = revision.revision.length ? revision.revision : 'development';
  const release = `${DeviceInfo.getReadableVersion()}.${rev}`;

  const dsn = config.get(Platform.OS === 'ios' ? 'sentry.ios' : 'sentry.android');
  Raven
    .config(dsn, { release })
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

  return Raven;
}

export default sentryInitializer();
