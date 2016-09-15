import { createReducer } from 'reduxsauce';
import keychain from '../../services/keychain';

export const INITIAL_STATE = {
  isAuthenticated: false
};

export const FETCH_TOKEN = 'shelfie/auth/FETCH_TOKEN';
export const IS_AUTHENTICATED = 'shelfie/auth/IS_AUTHENTICATED';

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

export async function setAuthToken(token) {
  return keychain.setAuthToken(token);
}

export async function getAuthToken() {
  return keychain.getAuthToken();
}
