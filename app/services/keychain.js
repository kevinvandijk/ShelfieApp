import * as Keychain from 'react-native-keychain';

export async function getRefreshToken() {
  try {
    const refreshToken = await Keychain.getInternetCredentials('shelfie-refresh-token');
    return refreshToken.password;
  } catch (err) {
    if (err.message.match(/No keychain entry found/)) {
      return null;
    }

    throw err;
  }
}

export async function setRefreshToken(token) {
  return Keychain.setInternetCredentials('shelfie-refresh-token', 'shelfie', token);
}

export async function clearRefreshToken() {
  return Keychain.resetInternetCredentials('shelfie-refresh-token');
}
