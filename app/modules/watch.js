import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import { fork, take, put, call, cancel, cancelled } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Orientation from 'react-native-orientation';

export const ORIENTATION_CHANGED = 'shelfie/watch/ORIENTATION_CHANGED';
export const START_WATCHING_ORIENTATION = 'shelfie/watch/START_WATCHING_ORIENTATION';
export const STOP_WATCHING_ORIENTATION = 'shelfie/watch/STOP_WATCHING_ORIENTATION';

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
export const startWatchingOrientation = createAction(START_WATCHING_ORIENTATION);
export const stopWatchingOrientation = createAction(STOP_WATCHING_ORIENTATION);

function local(state) {
  return state.watch;
}

export function getOrientation(state) {
  return local(state).orientation;
}

export function isWatchingFullscreen(state) {
  const orientation = getOrientation(state);

  const fullscreen = [
    'LANDSCAPE',
    'LANDSCAPE-LEFT',
    'LANDSCAPE-RIGHT',
    'PORTRAITUPSIDEDOWN'
  ].includes(orientation);

  return fullscreen;
}

function createOrientationChannel() {
  return eventChannel((emit) => {
    const orientationHandler = (orientation) => {
      emit(orientation);
    };

    Orientation.addSpecificOrientationListener(orientationHandler);

    // Unsubscriber:
    return () => {
      Orientation.removeOrientationListener(orientationHandler);
    };
  });
}

function* watchOrientationSaga() {
  const channel = yield call(createOrientationChannel);

  try {
    while (true) {
      const orientation = yield take(channel);
      yield put(orientationChanged(orientation));
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

// FIXME: Terrible naming:
export function* watchWatchSaga() {
  while (yield take(START_WATCHING_ORIENTATION)) {
    const watcher = yield fork(watchOrientationSaga);
    yield take(STOP_WATCHING_ORIENTATION);
    yield cancel(watcher);
  }
}
