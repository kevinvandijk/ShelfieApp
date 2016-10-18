import { fork } from 'redux-saga/effects';
import { login, signup, watchLoginRequest } from './modules/auth/sagas';
import { waitForAppLoadRequest } from './modules/boot/sagas';
import { videoWatchers } from './modules/videos/sagas';

export default function* rootSaga() {
  // yield fork(login);
  // yield fork(signup);
  yield fork(waitForAppLoadRequest);
  yield fork(watchLoginRequest);
  yield fork(videoWatchers);
}
