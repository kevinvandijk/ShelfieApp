import api from '../../services/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_VIDEOS,
  FETCH_SIGNED_OUTPUT_URL,
  receiveSignedOutputUrl,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_ERROR
} from './index';

function* fetchVideos() {
  const data = api.getVideos();
  data.payload = {
    ...data.payload,
    success: FETCH_VIDEOS_SUCCESS,
    error: FETCH_VIDEOS_ERROR
  };

  yield put(data);
}

function* fetchSignedOutputUrl({ payload }) {
  const result = yield call(api.getSignedOutputUrl, payload.videoId, payload.quality);

  if (!result.error) {
    yield put(receiveSignedOutputUrl({
      data: result.payload.data,
      videoId: payload.videoId,
      quality: payload.quality
    }));
  }
}

export function* videoWatchers() {
  yield takeLatest(FETCH_VIDEOS, fetchVideos);
  yield takeLatest(FETCH_SIGNED_OUTPUT_URL, fetchSignedOutputUrl);
}
