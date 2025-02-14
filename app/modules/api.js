import { take, call, put, select, spawn, actionChannel } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { refreshAccessToken, getAccessToken, logout } from './auth';
import { request } from '../lib/request';
import { refreshTokenUrl } from '../services/api';
import { getRefreshToken } from '../services/keychain';

export const API_REQUEST = 'shelfie/api/REQUEST';

export const apiRequest = createAction(API_REQUEST);

function* doApiRequest(requestData, accessToken) {
  const options = {};
  const method = requestData.method.toLowerCase();

  if (requestData.data && method !== 'get' && method !== 'head') {
    options.body = {
      data: requestData.data
    };
  }

  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`
    };
  }

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

function* handleApiRequest(requestData) {
  // check if acces token is valid
  // if so, fork / spawn process with request so parent can continue with next request
  // if not start blocking call() to refresh token, other requests will queue up now

  if (requestData.unauthenticated) {
    yield spawn(doApiRequest, requestData);
    return;
  }

  const accessToken = yield select(getAccessToken);
  let accessTokenValid = false;

  // TODO: Memoize this token decoding:
  if (accessToken) {
    const { exp } = jwtDecode(accessToken);
    accessTokenValid = exp ? moment() < moment.unix(exp) : false;
  }

  if (!accessTokenValid) {
    const refreshToken = yield call(getRefreshToken);

    if (!refreshToken) {
      yield put(logout());
      return;
    }

    const body = {
      data: {
        refreshToken
      }
    };
    const result = yield call(request, 'PUT', refreshTokenUrl(), { body });

    if (!result.error) {
      const { payload } = result;
      const token = payload.data.accessToken;
      yield put(refreshAccessToken(token));
      yield spawn(doApiRequest, requestData, token);
    } else {
      yield put(logout());
    }
  } else {
    yield spawn(doApiRequest, requestData, accessToken);
  }
}

// do with action channel
export function* watchApiRequests() {
  const requestChan = yield actionChannel(API_REQUEST);
  while (true) {
    const { payload } = yield take(requestChan);
    yield call(handleApiRequest, payload);
  }
}
