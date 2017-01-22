import { applyMiddleware, createStore } from 'redux';
import {
  reducer as createStorageReducer,
  createMiddleware as createStorageMiddleware
} from 'redux-storage';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import config from '../../config';
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

// Logger must be the last middleware in chain
const loggerOptions = {
  // Remove seamless immutable stuff for nicer logging:
  stateTransformer: (state) => state.asMutable({ deep: true })
};
if (!__DEV__) loggerOptions.colors = false;
const logger = createLogger(loggerOptions);
middlewares.push(logger);

export default function configureStore() {
  const store = createStore(
    createStorageReducer(reducer),
    applyMiddleware(...middlewares)
  );

  if (storage) storage.addStore(store);

  sagaMiddleware.run(sagas);

  return store;
}
