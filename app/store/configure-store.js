import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

import reducer from '../reducer';

const logger = createLogger();
export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(logger) // Logger must be the last middleware in chain
  );

  return store;
}
