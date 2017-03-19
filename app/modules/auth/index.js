import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import { ActionConst } from 'react-native-router-flux';
import keychain from '../../services/keychain';
import { getLoginUrl } from '../../services/api';
import { API_REQUEST } from '../api';

export const INITIAL_STATE = {
  isAuthenticated: false
};

export const LOGIN_SUCCESS = 'shelfie/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'shelfie/auth/LOGIN_FAIL';
export const LOGOUT = 'shelfie/auth/LOGOUT';
export const IS_AUTHENTICATED = 'shelfie/auth/IS_AUTHENTICATED';

export default createReducer(INITIAL_STATE, {
  [IS_AUTHENTICATED]: (state, { payload }) => {
    return {
      ...state,
      isAuthenticated: true,
      account: payload.user,
      accessToken: payload.accessToken
    };
  },

  [LOGOUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      accessToken: null,
      account: {}
    };
  },

  // Used so the login screen can quickly blur the input fields when navigating back
  [ActionConst.PUSH]: (state, action) => {
    if (action.key === 'auth') {
      return {
        ...state,
        authScreenFocused: true
      };
    }

    return state;
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
      fail: LOGIN_FAIL
    }
  };
}

export const logout = createAction(LOGOUT);
export const isAuthenticated = createAction(IS_AUTHENTICATED);

// TODO: rename
export function getAuthToken(state) {
  return state.auth.accessToken;
}

export function userIsAuthenticated(state) {
  return !!state.auth.isAuthenticated;
}

export function authScreenIsFocused(state) {
  return !!state.auth.authScreenFocused;
}
