import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import { omit } from 'lodash';

export const INITIAL_STATE = {};

export const FETCH_VIDEOS = 'shelfie/videos/FETCH_VIDEOS';
export const RECEIVE_VIDEOS = 'shelfie/videos/RECEIVE_VIDEOS';

export default createReducer(INITIAL_STATE, {
  [RECEIVE_VIDEOS]: (state, action) => {
    const byId = action.payload.data.reduce((result, video) => {
      return {
        ...result,
        [video.id]: {
          id: video.id,
          ...omit(video.attributes, ['_user', 'input', '_uploader'])
        }
      };
    }, {});

    return {
      ...state,
      byId: {
        ...state.byId,
        ...byId
      },
      total: action.payload.meta.total
    };
  }
});

export const fetchVideos = createAction(FETCH_VIDEOS);
export const receiveVideos = createAction(RECEIVE_VIDEOS);
