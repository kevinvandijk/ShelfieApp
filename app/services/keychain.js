import Keychain from 'react-native-keychain';

// TODO: Make configurable name
async function getAuthToken() {
  return Keychain.getInternetCredentials('shelfie-auth-token');
}

async function setAuthToken(token) {
  return Keychain.setInternetCredentials('shelfie-auth-token', null, token);
}

export default {
  setAuthToken
};
