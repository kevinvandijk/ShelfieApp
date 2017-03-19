import { take, call, put } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGOUT, isAuthenticated } from './index';
import { setRefreshToken, clearRefreshToken } from '../../services/keychain';
import storage from '../../services/storage';

export function* handleLogoutSaga() {
  yield call(clearRefreshToken);
  // TODO: Call endpoint on api to destroy refresh token
  yield call(storage.clearStorage);
}

function* handleLoginSuccessSaga(payload) {
  const { data } = payload;

  yield put(isAuthenticated({
    user: data.user,
    accessToken: data.accessToken
  }));
  yield call(setRefreshToken, data.refreshToken);
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
    yield handleLogoutSaga();
  }
}
