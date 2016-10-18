import Keychain from 'react-native-keychain';

// TODO: Make configurable name
async function getAuthToken() {
  try {
    const authToken = await Keychain.getInternetCredentials('shelfie-auth-token');
    return authToken.password;
  } catch(err) {
    if (err.message.match(/No keychain entry found/)) {
      return null;
    } else {
      throw err;
    }
  }
}

async function setAuthToken(token) {
  return Keychain.setInternetCredentials('shelfie-auth-token', null, token);
}

export default {
  getAuthToken,
  setAuthToken
};
