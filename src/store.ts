import { StoreModule, combineReducers } from '@ngrx/store';

import { Reducers } from './reducers';

const combinedReducers = combineReducers(Reducers);

export function reducer(state: any, action: any) {
  return combinedReducers(state, action);
}

let modules = [
  StoreModule.provideStore(reducer)
];

if (__DEV__) { // will be removed by minification
  const StoreDevtoolsModule = require('@ngrx/store-devtools').StoreDevtoolsModule;
  modules.push(StoreDevtoolsModule.instrumentOnlyWithExtension())
}

export const STORE = modules;