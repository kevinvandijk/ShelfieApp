import { load, dispatch, engine } from '../store/storage-engine';

export const SAVE_STATE_REQUEST = 'app/storage/SAVE_STATE_REQUEST';
export const LOAD_STATE_REQUEST = 'app/storage/LOAD_STATE_REQUEST';
export const CLEAR_STORAGE_REQUEST = 'app/storage/CLEAR_STORAGE_REQUEST';
export const CLEAR_STORAGE_FAIL = 'app/storage/CLEAR_STORAGE_FAIL';


// Only useful when storage.autosave is false:
export function saveState() {
  dispatch({ type: SAVE_STATE_REQUEST });
}

export function loadState() {
  load();
}

export async function clearStorage() {
  try {
    dispatch({ type: CLEAR_STORAGE_REQUEST });
    engine.save({});
  } catch (err) {
    dispatch({ type: CLEAR_STORAGE_FAIL, payload: err });
  }
}
