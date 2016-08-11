import { fork } from 'redux-saga/effects';
import { login, signup } from './modules/auth/sagas';

export default function* rootSaga() {
  yield fork(login);
  yield fork(signup);
}
