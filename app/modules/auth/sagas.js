import { take, call, put } from 'redux-saga/effects';
import { FETCH_TOKEN, IS_AUTHENTICATED } from './index';
import api from '../../services/api';
import keychain from '../../services/keychain';

export function* login() {
  return;
}

export function* signup() {
  return;
}

function* loginRequest(email, password) {
  const result = yield call(api.login, email, password);
  if (result.ok) {
    yield call(keychain.setAuthToken, result.data.token); // TODO: Error handling

    yield put({
      type: IS_AUTHENTICATED,
      payload: result.data.user
    });


  } else {
    console.log('error');
  }
  return true;
}

export function* watchLoginRequest() {
  while (true) {
    const { email, password } = yield take(FETCH_TOKEN);
    yield call(loginRequest, email, password);
  }
}
