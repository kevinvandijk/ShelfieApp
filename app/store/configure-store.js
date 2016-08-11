import { applyMiddleware, createStore } from 'redux';
import {
  reducer as createStorageReducer,
  createMiddleware as createStorageMiddleware,
  createLoader as createStorageLoader
} from 'redux-storage';
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage';

import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import Reactotron from 'reactotron';

import reducer from '../reducer';
import sagas from '../sagas';

const storageEngine = createStorageEngine('save-key');
const storageMiddleware = createStorageMiddleware(storageEngine);
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function configureStore() {
  const store = createStore(
    createStorageReducer(reducer),
    applyMiddleware(
      sagaMiddleware,
      storageMiddleware,
      logger,
      Reactotron.reduxMiddleware
    ) // Logger and Reactotron must be the last middleware in chain
  );

  if (__DEV__) Reactotron.addReduxStore(store); //eslint-disable-line

  createStorageLoader(storageEngine)(store)
    .then((state) => console.log('Loaded state:', state)) //eslint-disable-line
    .catch(() => console.log('Failed to load previous state')); //eslint-disable-line

  sagaMiddleware.run(sagas);

  return store;
}
