import { createAction } from 'redux-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { engine, load } from '../store/storage-engine';

export const CLEAR_STORAGE = 'shelfie/storage/CLEAR_STORAGE';
export const STORAGE_CLEARED = 'shelfie/storage/STORAGE_CLEARED';

export const SAVE_TO_STORAGE = 'shelfie/storage/SAVE_TO_STORAGE';

export const LOAD_FROM_STORAGE = 'shelfie/storage/LOAD_FROM_STORAGE';
export const STORAGE_LOADED = 'shelfie/storage/STORAGE_LOADED';

export const clearStorage = createAction(CLEAR_STORAGE);
export const storageCleared = createAction(STORAGE_CLEARED);

export const loadFromStorage = createAction(LOAD_FROM_STORAGE);
export const storageLoaded = createAction(STORAGE_LOADED);

export const saveToStorage = createAction(SAVE_TO_STORAGE);

function* handleClearStorageSaga() {
  yield call(engine.save, {});
  yield put(storageCleared());
}

function* handleLoadFromStorageSaga() {
  yield call(load);
  yield put(storageLoaded());
}

export function* watchStorageSaga() {
  yield takeLatest(CLEAR_STORAGE, handleClearStorageSaga);
  yield takeLatest(LOAD_FROM_STORAGE, handleLoadFromStorageSaga);
}
