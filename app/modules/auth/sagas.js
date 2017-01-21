import { take, call, put } from 'redux-saga/effects';
// import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';
import { FETCH_TOKEN, LOGOUT, REQUEST_FACEBOOK_AUTH, CHANGE_PASSWORD_REQUEST, setAuthToken, isAuthenticated, changePasswordSuccess } from './index';
import { clearState } from '../../reducer';
import api from '../../services/api';
import keychain from '../../services/keychain';
import storage from '../../services/storage';

export function* login() {
  return;
}

export function* signup() {
  return;
}

export function* logout() {
  api.setAuthToken(null);
  yield call(keychain.clearAuthToken);
  yield call(storage.clearStorage);
}

function* loginRequest(email, password) {
  const result = yield call(api.login, email, password);
  if (!result.error) {
    // TODO: Error handling when keychain fails?
    api.setAuthToken(result.payload.token);
    yield put(isAuthenticated(result.payload.user));
    yield call(keychain.setAuthToken, result.payload.token);
    yield call(storage.saveState);
  }
}

function* changePasswordRequest(password) {
  const result = yield call(api.changePassword, password);
  if (!result.error) {
    yield put(changePasswordSuccess());
  }
}

function* facebookRequest() {
  // TODO: Error handling:
  // yield call(LoginManager.logInWithReadPermissions, ['public_profile', 'email']);
  const accessToken = yield call(AccessToken.getCurrentAccessToken);

  const result = yield call(api.swapFBToken, accessToken);
  if (!result.error) {
    api.setAuthToken(result.payload.token);
    yield put(isAuthenticated(result.payload.user));
    yield call(keychain.setAuthToken, result.payload.token);
    yield call(storage.saveState);
  } else {
    console.log('what do?');
  }
}

export function* watchLoginRequest() {
  while (true) { // eslint-disable-line
    const { email, password } = yield take(FETCH_TOKEN);
    yield call(loginRequest, email, password);
  }
}

export function* watchFacebookRequest() {
  while (true) {
    yield take(REQUEST_FACEBOOK_AUTH);
    yield facebookRequest();
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);
    yield logout();
  }
}

export function* watchChangePasswordRequest() {
  while (true) {
    const { payload } = yield take(CHANGE_PASSWORD_REQUEST);
    yield changePasswordRequest(payload);
  }
}
