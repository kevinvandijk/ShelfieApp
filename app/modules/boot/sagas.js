import { take, put, call } from 'redux-saga/effects';
import storage, { LOAD } from '../../services/storage';
import api from '../../services/api';

import { INITIALIZE, appLoaded } from './index';
import { getAuthToken } from '../auth';

export function* waitForAppLoadRequest() {
  yield take(INITIALIZE);

  const authToken = yield call(getAuthToken);
  if (authToken) {
    api.setAuthToken(authToken);

    yield call(storage.loadState);
    yield take(LOAD);
    yield put(appLoaded());
  } else {
    yield call(storage.clearStorage);
    yield put(appLoaded());
  }
}
