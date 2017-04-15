import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import { ActionConst } from 'react-native-router-flux';
import { take, call, put } from 'redux-saga/effects';

import { API_REQUEST } from './api';
import { getLoginUrl } from '../services/api';
import { setRefreshToken, clearRefreshToken } from '../services/keychain';
import { saveToStorage, clearStorage, STORAGE_CLEARED } from './storage';

export const LOGIN_SUCCESS = 'shelfie/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'shelfie/auth/LOGIN_FAIL';
export const LOGOUT = 'shelfie/auth/LOGOUT';
export const LOGOUT_SUCCESS = 'shelfie/auth/LOGOUT_SUCCESS';

export const IS_AUTHENTICATED = 'shelfie/auth/IS_AUTHENTICATED';
export const REFRESH_ACCESS_TOKEN = 'shelfie/auth/REFRESH_ACCESS_TOKEN';

export const logout = createAction(LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const isAuthenticated = createAction(IS_AUTHENTICATED);
export const refreshAccessToken = createAction(REFRESH_ACCESS_TOKEN);

const INITIAL_STATE = {
  isAuthenticated: false
};

export default createReducer(INITIAL_STATE, {
  [REFRESH_ACCESS_TOKEN]: (state, { payload }) => {
    return {
      ...state,
      accessToken: payload
    };
  },

  [IS_AUTHENTICATED]: (state, { payload }) => {
    return {
      ...state,
      loginFailed: false,
      isAuthenticated: true,
      account: payload.user,
      accessToken: payload.accessToken
    };
  },

  [API_REQUEST]: (state) => {
    // FIXME: This API_REQUEST thing needs to be done differently
    return {
      ...state,
      loginFailed: false
    };
  },

  [LOGIN_FAIL]: (state) => {
    return {
      ...state,
      loginFailed: true,
      isAuthenticated: false
    };
  },

  [LOGOUT_SUCCESS]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      accessToken: null,
      account: {}
    };
  },

  // Used so the login screen can quickly blur the input fields when navigating back
  [ActionConst.PUSH]: (state, action) => {
    const authScreenFocused = action.key === 'auth';
    return (state.authScreenFocused === authScreenFocused
      ? { ...state, authScreenFocused }
      : state
    );
  },

  [ActionConst.REFRESH]: (state, action) => {
    const authScreenFocused = action.key === 'auth';
    return (state.authScreenFocused === authScreenFocused
      ? { ...state, authScreenFocused }
      : state
    );
  },

  [ActionConst.BACK_ACTION]: (state) => {
    if (state.authScreenFocused) {
      return {
        ...state,
        authScreenFocused: false
      };
    }

    return state;
  }
});

export function login(email, password) {
  return {
    type: API_REQUEST,
    payload: {
      url: getLoginUrl(),
      method: 'POST',
      data: {
        email,
        password
      },
      success: LOGIN_SUCCESS,
      fail: LOGIN_FAIL,
      unauthenticated: true
    }
  };
}

export function getAccessToken(state) {
  return state.auth.accessToken;
}

export function userIsAuthenticated(state) {
  return !!state.auth.isAuthenticated;
}

export function authScreenIsFocused(state) {
  return !!state.auth.authScreenFocused;
}

export function loginFailed(state) {
  return state.auth.loginFailed;
}

export function* handleLogoutSaga() {
  yield call(clearRefreshToken);
  yield put(clearStorage());
  yield take(STORAGE_CLEARED);
  yield put(logoutSuccess());
}

function* handleLoginSuccessSaga(payload) {
  const { data } = payload;

  yield put(isAuthenticated({
    user: data.user,
    accessToken: data.accessToken
  }));

  yield call(setRefreshToken, data.refreshToken);
  yield put(saveToStorage());
}

export function* watchLoginSuccessSaga() {
  while (true) {
    const { payload } = yield take(LOGIN_SUCCESS);
    yield call(handleLoginSuccessSaga, payload);
  }
}

export function* watchLogoutSaga() {
  while (true) {
    yield take(LOGOUT);
    yield handleLogoutSaga();
  }
}
