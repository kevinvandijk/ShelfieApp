import { fork } from 'redux-saga/effects';
import { watchLoginSuccessSaga, watchLogoutSaga } from './modules/auth';
import { watchInitializeSaga } from './modules/boot';
import { watchApiRequests } from './modules/api';

// TODO: Refactor login / logout order and stuff, put boot here
export default function* rootSaga() {
  yield fork(watchInitializeSaga);
  yield fork(watchLoginSuccessSaga);
  yield fork(watchApiRequests);
  yield fork(watchLogoutSaga);
}
