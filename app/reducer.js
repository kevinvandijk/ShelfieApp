import { combineReducers } from 'redux';
import authReducer from './modules/auth/duck';

export default combineReducers({
  auth: authReducer
});
