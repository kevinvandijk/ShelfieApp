import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { ActionConst } from 'react-native-router-flux';

import auth from './modules/auth';
import boot from './modules/boot';
import videos from './modules/videos';

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

export default combineReducers({
  router: routerReducer,
  auth,
  boot,
  videos
});
