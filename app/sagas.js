import { fork } from 'redux-saga/effects';
import { login, signup, watchLoginRequest, watchLogout, watchChangePasswordRequest } from './modules/auth/sagas';
import { waitForAppLoadRequest } from './modules/boot/sagas';
import { videoWatchers } from './modules/videos/sagas';
import { watchApiRequests } from './modules/api';

// TODO: Refactor login / logout order and stuff, put boot here
export default function* rootSaga() {
  // yield fork(login);
  // yield fork(signup);

  yield fork(waitForAppLoadRequest);
  yield fork(watchLoginRequest);
  yield fork(videoWatchers);
  yield fork(watchApiRequests);
  yield fork(watchLogout);
  yield fork(watchChangePasswordRequest);
}
