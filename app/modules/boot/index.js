import { createReducer } from 'reduxsauce';

export const INITIALIZE = 'shelfie/boot/INITIALIZE';
export const APP_LOADED = 'shelfie/boot/APP_LOADED';

export const INITIAL_STATE = {
  isLoaded: false
};

export default createReducer(INITIAL_STATE, {
  [APP_LOADED]: (state) => {
    return {
      ...state,
      isLoaded: true
    };
  }
});

export function initialize() {
  return {
    type: INITIALIZE
  };
}

export function appLoaded() {
  return {
    type: APP_LOADED
  };
}
