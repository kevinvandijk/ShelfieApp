import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';

import auth from './modules/auth';

const initialRouterState = {
  scene: {}
};

function routerReducer(state = initialRouterState, action = {}) {
  switch (action.type) {
    // Provide redux with information when scene is focussed:
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene
      };
    default:
      return state;
  }
}

export default combineReducers({
  router: routerReducer,
  auth
});
