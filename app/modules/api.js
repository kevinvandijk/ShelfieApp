import { take, fork, call, put } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { request } from '../lib/request';

export const API_REQUEST = 'shelfie/api/REQUEST';

export const apiRequest = createAction(API_REQUEST);

function* handleApiRequest(payload) {
  const options = {};
  const method = payload.method.toLowerCase();

  if (payload.data && method !== 'get' && method !== 'head') {
    options.body = {
      data: payload.data
    };
  }

  const result = yield call(request, payload.method, payload.url, options);

  if (!payload.fail) throw new Error(`${API_REQUEST} requires error action type`);
  if (!payload.success) throw new Error(`${API_REQUEST} requires success action type`);

  if (result.error) {
    yield put({
      type: payload.fail,
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
