import config from '../../config';
import { applyMiddleware, createStore } from 'redux';
import {
  reducer as createStorageReducer,
  createMiddleware as createStorageMiddleware
} from 'redux-storage';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import Reactotron from 'reactotron';

import combinedReducer from '../reducer';
import sagas from '../sagas';
import { SAVE_STATE_REQUEST } from '../services/storage';

let reducer = combinedReducer;

const middlewares = [];

let storage;
if (config.get('storage.enabled')) {
  storage = require('./storage-engine'); // eslint-disable-line global-require
  const whitelist = config.get('storage.autosave') ? [] : [SAVE_STATE_REQUEST];
  const storageMiddleware = createStorageMiddleware(storage.engine, [], whitelist);
  middlewares.push(storageMiddleware);

  reducer = createStorageReducer(combinedReducer);
}

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// Logger and Reactotron must be the last middleware in chain
const logger = createLogger({
  // Remove seamless immutable stuff for nicer logging:
  stateTransformer: (state) => state.asMutable({ deep: true })
});
middlewares.push(logger);

if (__DEV__) middlewares.push(Reactotron.reduxMiddleware);

export default function configureStore() {
  const store = createStore(
    createStorageReducer(reducer),
    applyMiddleware(...middlewares)
  );

  if (storage) storage.addStore(store);
  if (__DEV__) Reactotron.addReduxStore(store); //eslint-disable-line

  sagaMiddleware.run(sagas);

  return store;
}
