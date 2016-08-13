import test from 'ava';
import reducer, { INITIAL_STATE } from '../../app/modules/auth';

// Example test:
test('Initial state should be given when not dispatching an action', t => {
  const state = reducer(undefined);

  t.deepEqual(state, INITIAL_STATE);
});
