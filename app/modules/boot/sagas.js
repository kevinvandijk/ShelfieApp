import { take, put, call } from 'redux-saga/effects';
import storage, { LOAD } from '../../services/storage';
import keychain from '../../services/keychain';

import { INITIALIZE, appLoaded } from './index';

export function* waitForAppLoadRequest() {
  while (true) {
    yield take(INITIALIZE);

    const authToken = yield call(keychain.getAuthToken);
    if (authToken) {
      yield call(storage.loadState);
      yield take(LOAD);
      yield put(appLoaded());
    } else {
      yield call(storage.clearStorage);
      yield put(appLoaded());
    }
  }
}
