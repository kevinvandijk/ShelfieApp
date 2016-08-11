import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import Reactotron from 'reactotron';

import reducer from '../reducer';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(
      sagaMiddleware,
      logger,
      Reactotron.reduxMiddleware
    ) // Logger and Reactotron must be the last middleware in chain
  );

  if (__DEV__) Reactotron.addReduxStore(store); //eslint-disable-line

  sagaMiddleware.run(sagas);

  return store;
}
