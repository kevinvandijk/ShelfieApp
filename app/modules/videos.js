import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import { omit, keyBy, mapValues } from 'lodash';
import { API_REQUEST } from './api';
import { getVideosUrl, getOutputUrl } from '../services/api';

export const INITIAL_STATE = {
  total: 0,
  byId: {},
  byYear: {}
};

export const FETCH_VIDEOS_SUCCESS = 'shelfie/videos/FETCH_VIDEOS_SUCCESS';
export const FETCH_VIDEOS_FAIL = 'shelfie/videos/FETCH_VIDEOS_FAIL';
export const FETCH_SIGNED_OUTPUT_URL_SUCCESS = 'shelfie/videos/FETCH_SIGNED_OUTPUT_URL_SUCCESS';
export const FETCH_SIGNED_OUTPUT_URL_FAIL = 'shelfie/videos/FETCH_SIGNED_OUTPUT_URL_FAIL';

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

  [FETCH_SIGNED_OUTPUT_URL_SUCCESS]: (state, action) => {
    const { data, extra } = action.payload;

    return {
      ...state,
      [extra.quality]: {
        ...state[extra.quality],
        [extra.videoId]: data.attributes.url
      }
    };
  }
});

export const fetchVideos = createAction(API_REQUEST, () => {
  return {
    url: getVideosUrl(),
    method: 'GET',
    success: FETCH_VIDEOS_SUCCESS,
    fail: FETCH_VIDEOS_FAIL
  };
});

export const fetchSignedOutputUrl = createAction(API_REQUEST, (videoId, quality) => {
  return {
    url: getOutputUrl(videoId, quality),
    method: 'GET',
    success: FETCH_SIGNED_OUTPUT_URL_SUCCESS,
    fail: FETCH_SIGNED_OUTPUT_URL_FAIL,
    extra: {
      videoId,
      quality
    }
  };
});

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
