import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  isAuthenticated: false
};

export const FETCH_TOKEN = 'shelfie/auth/FETCH_TOKEN';
export const IS_AUTHENTICATED = 'shelfie/auth/IS_AUTHENTICATED';
export const RECEIVE_ACCOUNT = 'shelfie/auth/RECEIVE_ACCOUNT';

export default createReducer(INITIAL_STATE, {
  [IS_AUTHENTICATED]: (state, action) => {
    return {
      ...state,
      isAuthenticated: action.payload
    };
  },

  [RECEIVE_ACCOUNT]: (state, action) => {
    return {
      ...state,
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
