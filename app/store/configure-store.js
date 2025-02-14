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
import { SAVE_TO_STORAGE } from '../modules/storage';

let reducer = combinedReducer;

const middlewares = [];

let storage;
if (config.get('storage.enabled')) {
  storage = require('./storage-engine'); // eslint-disable-line global-require
  const whitelist = config.get('storage.autosave') ? [] : [SAVE_TO_STORAGE];
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
// Don't do logging for now in test because it's really annoying
if (process.env.NODE_ENV !== 'test') middlewares.push(logger);

export default function configureStore() {
  const store = createStore(
    createStorageReducer(reducer),
    applyMiddleware(...middlewares)
  );

  if (storage) storage.addStore(store);

  sagaMiddleware.run(sagas);

  return store;
}
