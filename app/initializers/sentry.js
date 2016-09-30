import DeviceInfo from 'react-native-device-info';
import Raven from 'raven-js';
import config from '../../config';

require('raven-js/plugins/react-native')(Raven);

export default function sentryInitializer() {
  if (__DEV__ || (process.env && process.env.NODE_ENV === 'development')) return;

  Raven
    .config(config.get('sentry.dsn'), { release: DeviceInfo.getReadableVersion() })
    .install();

  Raven.setExtraContext({
    'Device Unique ID': DeviceInfo.getUniqueID(),
    'Device Manufacturer': DeviceInfo.getManufacturer(),
    'Device Brand': DeviceInfo.getBrand(),
    'Device Model': DeviceInfo.getModel(),
    'Device ID': DeviceInfo.getDeviceId(),
    'Device System': `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
    'Device Name': DeviceInfo.getDeviceName(),
    'Device Locale': DeviceInfo.getDeviceLocale(),
    'Device Country': DeviceInfo.getDeviceCountry()
  });
}
