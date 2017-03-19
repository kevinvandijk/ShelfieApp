import { createReducer } from 'reduxsauce';
import { take, put, call } from 'redux-saga/effects';

import storage, { LOAD } from '../../services/storage';
import { getRefreshToken } from '../../services/keychain';

export const INITIALIZE = 'shelfie/boot/INITIALIZE';
export const APP_LOADED = 'shelfie/boot/APP_LOADED';

export function initialize() {
  return {
    type: INITIALIZE
  };
}

export function appLoaded() {
  return {
    type: APP_LOADED
  };
}

const INITIAL_STATE = {
  isLoaded: false
};

export default createReducer(INITIAL_STATE, {
  [APP_LOADED]: (state) => {
    return {
      ...state,
      isLoaded: true
    };
  }
});

export function* watchInitializeSaga() {
  while (true) {
    yield take(INITIALIZE);

    const refreshToken = yield call(getRefreshToken);
    if (refreshToken) {
      yield call(storage.loadState);
      yield take(LOAD);
      yield put(appLoaded());
    } else {
      yield call(storage.clearStorage);
      yield put(appLoaded());
    }
  }
}
