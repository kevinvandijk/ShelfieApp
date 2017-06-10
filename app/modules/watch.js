import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import Orientation from 'react-native-orientation';

export const ORIENTATION_CHANGED = 'shelfie/watch/ORIENTATION_CHANGED';

export const INITIAL_STATE = {
  orientation: 'UNKNOWN'
};

export default createReducer(INITIAL_STATE, {
  [ORIENTATION_CHANGED]: (state, { payload }) => {
    return {
      ...state,
      orientation: payload
    };
  }
});

export const orientationChanged = createAction(ORIENTATION_CHANGED);

function local(state) {
  return state.watch;
}

export function getOrientation(state) {
  return local(state).orientation;
}

export function isWatchingFullscreen(state) {
  const orientation = getOrientation(state);
  return orientation !== 'PORTRAIT' && orientation !== 'UNKNOWN';
}
