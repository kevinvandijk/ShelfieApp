import api from '../../services/api';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { FETCH_VIDEOS, receiveVideos } from './index';

function* fetchVideos() {
  const result = yield call(api.getVideos);

  if (!result.error) {
    yield put(receiveVideos(result.payload));
  }
}

export function* videoWatchers() {
  yield takeLatest(FETCH_VIDEOS, fetchVideos);
}
