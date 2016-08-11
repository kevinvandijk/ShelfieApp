import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

const INITIAL_STATE = Immutable.from({
  authenticated: false
});

export default createReducer(INITIAL_STATE, {

});
