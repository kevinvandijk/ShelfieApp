import { fork } from 'redux-saga/effects';
import { login, signup, watchLoginRequest } from './modules/auth/sagas';

export default function* rootSaga() {
  // yield fork(login);
  // yield fork(signup);
  yield fork(watchLoginRequest);
}
