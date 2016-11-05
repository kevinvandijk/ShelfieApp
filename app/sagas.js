import { fork } from 'redux-saga/effects';
import { login, signup, watchLoginRequest, watchLogout, watchFacebookRequest } from './modules/auth/sagas';
import { waitForAppLoadRequest } from './modules/boot/sagas';
import { videoWatchers } from './modules/videos/sagas';

// TODO: Refactor login / logout order and stuff, put boot here
export default function* rootSaga() {
  // yield fork(login);
  // yield fork(signup);
  yield fork(waitForAppLoadRequest);
  yield fork(watchLoginRequest);
  yield fork(videoWatchers);
  yield fork(watchLogout);
  yield fork(watchFacebookRequest);
}
