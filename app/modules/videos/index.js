import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import { omit, keyBy, mapValues } from 'lodash';
import { API_REQUEST } from '../api';
import { getVideosUrl } from '../../services/api';

export const INITIAL_STATE = {
  total: 0,
  byId: {},
  byYear: {}
};

export const FETCH_VIDEOS_SUCCESS = 'shelfie/videos/FETCH_VIDEOS_SUCCESS';
export const FETCH_VIDEOS_ERROR = 'shelfie/videos/FETCH_VIDEOS_ERROR';
export const FETCH_SIGNED_OUTPUT_URL = 'shelfie/videos/FETCH_SIGNED_OUTPUT_URL';
export const RECEIVE_SIGNED_OUTPUT_URL = 'shelfie/videos/RECEIVE_SIGNED_OUTPUT_URL';

export default createReducer(INITIAL_STATE, {
  // TODO: Clean up this mess:
  [FETCH_VIDEOS_SUCCESS]: (state, action) => {
    const byYear = state.byYear.asMutable();
    const byId = action.payload.data.reduce((result, video) => {
      const yearKey = video.attributes.year || '-';

      if (!byYear[yearKey]) byYear[yearKey] = [];
      if (!byYear[yearKey].includes(video.id)) byYear[yearKey].push(video.id);

      const outputs = keyBy(video.attributes.outputs, 'quality');
      return {
        ...result,
        [video.id]: {
          id: video.id,
          ...omit(video.attributes, ['_user', 'input', '_uploader', 'outputs']),
          outputs
        }
      };
    }, {});

    return {
      ...state,
      byId: {
        ...state.byId,
        ...byId
      },
      byYear,
      total: action.payload.meta.total
    };
  },

  [RECEIVE_SIGNED_OUTPUT_URL]: (state, action) => {
    const payload = action.payload;
    return {
      ...state,
      [payload.quality]: {
        ...state[payload.quality],
        [payload.videoId]: payload.data.attributes.url
      }
    }

    return state;
  }
});

export const fetchVideos = createAction(API_REQUEST, () => {
  return {
    url: getVideosUrl(),
    method: 'GET',
    success: FETCH_VIDEOS_SUCCESS,
    error: FETCH_VIDEOS_ERROR
  };
});

export const fetchSignedOutputUrl = createAction(FETCH_SIGNED_OUTPUT_URL, (videoId, quality) => {
  return { videoId, quality };
});
export const receiveSignedOutputUrl = createAction(RECEIVE_SIGNED_OUTPUT_URL);

function local(state) {
  return state.videos;
}

export function getVideo(state, videoId) {
  return local(state).byId[videoId];
}

export function getVideosById(state) {
  return local(state).byId || null;
}

export function getTotalVideos(state) {
  return local(state).total;
}

export function getSignedUrlForQuality(state, videoId, quality) {
  const localState = local(state);
  return localState[quality] && localState[quality][videoId];
}

export function getVideosByYear(state) {
  const byYear = local(state).byYear;
  return mapValues(byYear, (ids) => {
    return ids.map(id => getVideo(state, id));
  });
}
