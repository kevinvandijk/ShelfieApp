import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { ActionConst } from 'react-native-router-flux';

import auth, { LOGOUT } from './modules/auth';
import boot from './modules/boot';
import videos from './modules/videos';
import timeline from './modules/timeline';

// TODO: Move this somewhere better:
const initialRouterState = {
  scene: {}
};

const routerReducer = createReducer(initialRouterState, {
  [ActionConst.FOCUS]: (state = initialRouterState, action) => (
    state.merge({
      scene: action.scene
    })
  )
});

// Inspired by https://github.com/eadmundo/redux-seamless-immutable
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  return (inputState = Immutable.from({}), action) => {
    return Immutable.from(reducerKeys.reduce((reducersObject, reducerName) => {
      const reducer = reducers[reducerName];
      const reducerState = inputState[reducerName];

      return {
        ...reducersObject,
        [reducerName]: reducer(reducerState, action)
      };
    }, {}));
  };
}

const appReducer = combineReducers({
  router: routerReducer,
  auth,
  boot,
  videos,
  timeline
});

export default (state, action) => {
  return appReducer((action.type === LOGOUT ? undefined : state), action);
};
