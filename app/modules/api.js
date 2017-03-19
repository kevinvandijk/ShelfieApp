import { take, fork, call, put, select } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { getAuthToken } from './auth';
import { request } from '../lib/request';

export const API_REQUEST = 'shelfie/api/REQUEST';

export const apiRequest = createAction(API_REQUEST);

function* handleApiRequest(requestData) {
  const options = {};
  const method = requestData.method.toLowerCase();

  if (requestData.data && method !== 'get' && method !== 'head') {
    options.body = {
      data: requestData.data
    };
  }

  const authToken = yield select(getAuthToken);
  options.headers = {
    Authorization: `Bearer ${authToken}`
  };

  const result = yield call(request, requestData.method, requestData.url, options);

  if (!requestData.fail) throw new Error(`${API_REQUEST} requires fail action type`);
  if (!requestData.success) throw new Error(`${API_REQUEST} requires success action type`);

  const payload = (requestData.extra
    ? { ...result.payload, extra: requestData.extra }
    : result.payload
  );

  if (result.error) {
    yield put({
      type: requestData.fail,
      payload
    });
  } else {
    yield put({
      type: requestData.success,
      payload
    });
  }
}

export function* watchApiRequests(refresh) {
  while (true) {
    const { payload } = yield take(API_REQUEST);
    yield fork(handleApiRequest, payload);
  }
}
