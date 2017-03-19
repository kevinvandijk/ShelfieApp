import { take, call, put } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGOUT, CHANGE_PASSWORD_REQUEST, setAuthToken, isAuthenticated, changePasswordSuccess } from './index';
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

function* handleLoginSuccessSaga(payload) {
  const { data } = payload;

  api.setAuthToken(data.token);
  yield put(isAuthenticated(data.user));
  yield call(keychain.setAuthToken, data.token);
  yield call(storage.saveState);
}

function* changePasswordRequest(password) {
  const result = yield call(api.changePassword, password);
  if (!result.error) {
    yield put(changePasswordSuccess());
  }
}

export function* watchLoginRequest() {
  while (true) { // eslint-disable-line
    const { payload } = yield take(LOGIN_SUCCESS);
    yield call(handleLoginSuccessSaga, payload);
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
