import config from '../../config';
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

import combinedReducer from '../reducer';
import sagas from '../sagas';

const reducer = (config.get('storage.enabled')
  ? createStorageReducer(combinedReducer)
  : combinedReducer
);

const middlewares = [];

let storageEngine;
if (config.get('storage.enabled')) {
  storageEngine = createStorageEngine(config.get('storage.engineKey'));
  const storageMiddleware = createStorageMiddleware(storageEngine);
  middlewares.push(storageMiddleware);
}

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// Logger and Reactotron must be the last middleware in chain
const logger = createLogger();
middlewares.push(logger);

if (__DEV__) middlewares.push(Reactotron.reduxMiddleware);

export default function configureStore() {
  const store = createStore(
    createStorageReducer(reducer),
    applyMiddleware(...middlewares)
  );

  if (__DEV__) Reactotron.addReduxStore(store); //eslint-disable-line

  if (config.get('storage.enabled')) {
    createStorageLoader(storageEngine)(store)
      .then((state) => console.log('Loaded state:', state)) //eslint-disable-line
      .catch(() => console.log('Failed to load previous state')); //eslint-disable-line
  }

  sagaMiddleware.run(sagas);

  return store;
}
