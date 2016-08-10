import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import Reactotron from 'reactotron';

import reducer from '../reducer';

const logger = createLogger();
export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(
      logger,
      Reactotron.reduxMiddleware
    ) // Logger and Reactotron must be the last middleware in chain
  );

  if (__DEV__) Reactotron.addReduxStore(store); //eslint-disable-line

  return store;
}
