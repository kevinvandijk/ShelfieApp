import { fork } from 'redux-saga/effects';
import { watchLoginSuccessSaga, watchLogout } from './modules/auth/sagas';
import { waitForAppLoadRequest } from './modules/boot/sagas';
import { watchApiRequests } from './modules/api';

// TODO: Refactor login / logout order and stuff, put boot here
export default function* rootSaga() {
  yield fork(waitForAppLoadRequest);
  yield fork(watchLoginSuccessSaga);
  yield fork(watchApiRequests);
  yield fork(watchLogout);
}
