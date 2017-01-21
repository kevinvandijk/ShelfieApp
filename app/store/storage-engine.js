import { createLoader } from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import config from '../../config';

export { SAVE, LOAD } from 'redux-storage';

let store;
let loader;

export const engine = (config.get('storage.enabled')
  ? createEngine(config.get('storage.engineKey'))
  : null
);

export function addStore(newStore) {
  if (store) throw new Error('A store was already set!');
  store = newStore;
}

export function load() {
  if (!loader) loader = createLoader(engine);
  return loader(store);
}

export function dispatch(action) {
  if (!store) throw new Error('store wasn\'t set, set a store through addStore first');
  store.dispatch(action);
}
