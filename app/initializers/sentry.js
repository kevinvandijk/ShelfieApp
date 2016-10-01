import DeviceInfo from 'react-native-device-info';
import Raven from 'raven-js';
import config from '../../config';

require('raven-js/plugins/react-native')(Raven);

export default function sentryInitializer() {
  if (__DEV__ || (process.env && process.env.NODE_ENV === 'development')) return;

  Raven
    .config(config.get('sentry.dsn'), { release: DeviceInfo.getReadableVersion() })
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
}
