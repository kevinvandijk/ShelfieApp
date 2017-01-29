const deviceInfo = jest.genMockFromModule('react-native-keychain');

deviceInfo.getInternetCredentials = () => {
  return {};
};

module.exports = deviceInfo;
