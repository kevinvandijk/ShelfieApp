import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';

export const INITIAL_STATE = {};

export const FETCH_VIDEOS = 'shelfie/videos/FETCH_VIDEOS';
export const RECEIVE_VIDEOS = 'shelfie/videos/RECEIVE_VIDEOS';

export default createReducer(INITIAL_STATE, {
  [RECEIVE_VIDEOS]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    };
  }
});

export const fetchVideos = createAction(FETCH_VIDEOS);
export const receiveVideos = createAction(RECEIVE_VIDEOS);
