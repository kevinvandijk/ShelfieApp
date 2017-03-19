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
export const CHANGE_PASSWORD_REQUEST = ' shelfie/auth/CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = ' shelfie/auth/CHANGE_PASSWORD_REQUEST';

export default createReducer(INITIAL_STATE, {
  [IS_AUTHENTICATED]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      account: action.payload
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
export const changePassword = createAction(CHANGE_PASSWORD_REQUEST);
export const changePasswordSuccess = createAction(CHANGE_PASSWORD_SUCCESS);

export const isAuthenticated = createAction(IS_AUTHENTICATED);

export async function setAuthToken(token) {
  return keychain.setAuthToken(token);
}

export async function getAuthToken() {
  return keychain.getAuthToken();
}

export function userIsAuthenticated(state) {
  return !!state.auth.isAuthenticated;
}

export function authScreenIsFocused(state) {
  return !!state.auth.authScreenFocused;
}
