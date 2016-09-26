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
  if (!result.error) {
    yield call(setAuthToken, result.payload.token); // TODO: Error handling

    yield put({
      type: IS_AUTHENTICATED,
      payload: result.payload.user
    });

    storage.saveState();
  }
}

export function* watchLoginRequest() {
  while (true) {
    const { email, password } = yield take(FETCH_TOKEN);
    yield call(loginRequest, email, password);
  }
}
