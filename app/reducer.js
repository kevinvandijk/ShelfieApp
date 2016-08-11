import Immutable from 'seamless-immutable';
import { combineReducers } from 'redux';
import { createReducer } from 'reduxsauce';
import { ActionConst } from 'react-native-router-flux';

import auth from './modules/auth';

const initialRouterState = Immutable.from({
  scene: {}
});

const routerReducer = createReducer(initialRouterState, {
  [ActionConst.FOCUS]: (state = initialRouterState, action) => (
    state.merge({
      scene: action.scene
    })
  )
});

export default combineReducers({
  router: routerReducer,
  auth
});
