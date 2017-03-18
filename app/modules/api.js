import { take, fork, call, put } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { request } from '../lib/request';

export const API_REQUEST = 'shelfie/api/REQUEST';

export const apiRequest = createAction(API_REQUEST);

function* handleApiRequest(payload) {
  const result = yield call(request, payload.method, payload.url);

  if (result.error) {
    yield put({
      type: payload.error,
      payload: result.payload
    });
  } else {
    yield put({
      type: payload.success,
      payload: result.payload
    });
  }
}

export function* watchApiRequests(refresh) {
  while (true) {
    const { payload } = yield take(API_REQUEST);
    yield fork(handleApiRequest, payload);
  }
}
