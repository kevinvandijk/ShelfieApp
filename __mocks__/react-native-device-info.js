const deviceInfo = jest.genMockFromModule('react-native-device-info');

deviceInfo.getDeviceLocale = () => 'en-US';

module.exports = deviceInfo;
