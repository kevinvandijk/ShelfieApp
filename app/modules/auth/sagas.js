import { take, call, put } from 'redux-saga/effects';
import { FETCH_TOKEN, setAuthToken, isAuthenticated } from './index';
import api from '../../services/api';
import keychain from '../../services/keychain';
import storage from '../../services/storage';

export function* login() {
  return;
}

export function* signup() {
  return;
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

export function* watchLoginRequest() {
  while (true) { // eslint-disable-line
    const { email, password } = yield take(FETCH_TOKEN);
    yield call(loginRequest, email, password);
  }
}
