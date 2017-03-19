import { take, call, put } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGOUT, isAuthenticated } from './index';
import api from '../../services/api';
import keychain from '../../services/keychain';
import storage from '../../services/storage';

export function* logout() {
  yield call(keychain.clearAuthToken);
  yield call(storage.clearStorage);
}

function* handleLoginSuccessSaga(payload) {
  const { data } = payload;

  yield put(isAuthenticated({
    user: data.user,
    token: data.token
  }));
  yield call(keychain.setAuthToken, data.token);
  yield call(storage.saveState);
}

export function* watchLoginSuccessSaga() {
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
