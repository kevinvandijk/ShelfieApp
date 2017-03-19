import { createReducer } from 'reduxsauce';
import { take, put, call } from 'redux-saga/effects';

import { loadFromStorage, clearStorage, STORAGE_LOADED } from './storage';
import { getRefreshToken } from '../services/keychain';

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

export function getAppLoadedStatus(state) {
  return state.boot.isLoaded;
}

export function* watchInitializeSaga() {
  while (true) {
    yield take(INITIALIZE);

    const refreshToken = yield call(getRefreshToken);
    if (refreshToken) {
      yield put(loadFromStorage());
      yield take(STORAGE_LOADED);
      yield put(appLoaded());
    } else {
      yield put(clearStorage());
      yield put(appLoaded());
    }
  }
}
