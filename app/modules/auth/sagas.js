import { take, call, put } from 'redux-saga/effects';
import { FETCH_TOKEN, IS_AUTHENTICATED, setAuthToken } from './index';
import api from '../../services/api';
import storage from '../../services/storage';

export function* login() {
  return;
}

export function* signup() {
  return;
}

function* loginRequest(email, password) {
  const result = yield call(api.login, email, password);
  if (result.ok) {
    yield call(setAuthToken, result.data.token); // TODO: Error handling

    yield put({
      type: IS_AUTHENTICATED,
      payload: result.data.user
    });

    storage.saveState();
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
