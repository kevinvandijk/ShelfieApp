import { createReducer } from 'reduxsauce';
import { createAction } from 'redux-actions';
import { takeEvery, takeLatest, fork, take, put, call, cancel, cancelled } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import Orientation from 'react-native-orientation';
import { upperFirst } from 'lodash';

export const ORIENTATION_CHANGED = 'shelfie/watch/ORIENTATION_CHANGED';
export const START_WATCHING_ORIENTATION = 'shelfie/watch/START_WATCHING_ORIENTATION';
export const STOP_WATCHING_ORIENTATION = 'shelfie/watch/STOP_WATCHING_ORIENTATION';
export const UNLOCK_ORIENTATION = 'shelfie/watch/UNLOCK_ORIENTATION';
export const SET_ORIENTATION = 'shelfie/watch/SET_ORIENTATION';

export const INITIAL_STATE = {
  orientation: 'UNKNOWN'
};

export default createReducer(INITIAL_STATE, {
  [ORIENTATION_CHANGED]: (state, { payload }) => {
    const orientation = getOrientation(state);
    // Prevent fullscreen mode from switching off when putting the phone
    // FACEDOWN or FACEUP (which currently triggers an UNKNOWN event in react-native-orientation)
    if (isFullscreenOrientation(orientation) && payload === 'UNKNOWN') {
      return state;
    }

    return {
      ...state,
      orientation: payload
    };
  }
});

export const orientationChanged = createAction(ORIENTATION_CHANGED);
export const startWatchingOrientation = createAction(START_WATCHING_ORIENTATION);
export const stopWatchingOrientation = createAction(STOP_WATCHING_ORIENTATION);
export const unlockOrientation = createAction(UNLOCK_ORIENTATION);
export const setOrientation = createAction(SET_ORIENTATION, (orientation, { locked } = {}) => {
  return {
    orientation,
    locked: locked || false
  };
});

function local(state) {
  if (state.watch) return state.watch;
  return state;
}

function isFullscreenOrientation(orientation) {
  return [
    'LANDSCAPE',
    'LANDSCAPE-LEFT',
    'LANDSCAPE-RIGHT',
    'PORTRAITUPSIDEDOWN'
  ].includes(orientation);
}

export function getOrientation(state) {
  return local(state).orientation;
}

export function isWatchingFullscreen(state) {
  const orientation = getOrientation(state);
  const fullscreen = isFullscreenOrientation(orientation);

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

function* delayedOrientationChangeSaga(orientation) {
  yield delay(300);
  yield put(orientationChanged(orientation));
}

function* watchOrientationSaga() {
  const channel = yield call(createOrientationChannel);

  try {
    let task;
    while (true) {
      const orientation = yield take(channel);
      if (task) yield cancel(task);
      task = yield fork(delayedOrientationChangeSaga, orientation);
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* unlockOrientationSaga() {
  yield call(Orientation.unlockAllOrientations);
}

function* setOrientationSaga({ payload }) {
  yield put(orientationChanged(payload.orientation));
  // const orientation = upperFirst(payload.orientation);

  // yield call(Orientation[`lockTo${orientation}`]);

  // if (!payload.locked) {
  //   yield call(Orientation.unlockAllOrientations);
  // }
}

// FIXME: Terrible naming:
export function* watchWatchSaga() {
  yield takeEvery(UNLOCK_ORIENTATION, unlockOrientationSaga);
  yield takeEvery(SET_ORIENTATION, setOrientationSaga);

  while (yield take(START_WATCHING_ORIENTATION)) {
    const watcher = yield fork(watchOrientationSaga);
    yield take(STOP_WATCHING_ORIENTATION);
    yield cancel(watcher);
  }
}
