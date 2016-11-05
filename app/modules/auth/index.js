import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import keychain from '../../services/keychain';

export const INITIAL_STATE = {
  isAuthenticated: false
};

export const LOGOUT = 'shelfie/auth/LOGOUT';
export const FETCH_TOKEN = 'shelfie/auth/FETCH_TOKEN';
export const IS_AUTHENTICATED = 'shelfie/auth/IS_AUTHENTICATED';
export const REQUEST_FACEBOOK_AUTH = 'shelfie/auth/REQUEST_FACEBOOK_AUTH';

export default createReducer(INITIAL_STATE, {
  [IS_AUTHENTICATED]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      account: action.payload
    };
  }
});


export function login(email, password) {
  return {
    type: FETCH_TOKEN,
    email,
    password
  };
}

export const logout = createAction(LOGOUT);
export const requestFacebookAuth = createAction(REQUEST_FACEBOOK_AUTH);

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
