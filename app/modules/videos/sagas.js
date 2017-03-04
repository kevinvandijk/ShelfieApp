import api from '../../services/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_VIDEOS,
  FETCH_SIGNED_OUTPUT_URL,
  receiveVideos,
  receiveSignedOutputUrl
} from './index';

function* fetchVideos() {
  const result = yield call(api.getVideos);

  if (!result.error) {
    yield put(receiveVideos(result.payload));
  }
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
