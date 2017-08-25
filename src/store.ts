import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { Reducers } from './reducers';
import { AuthEffects } from './effects/auth';

const combinedReducers = combineReducers(Reducers);

export function reducer(state: any, action: any) {
  return combinedReducers(state, action);
}

let modules = [
  StoreModule.provideStore(reducer),
  EffectsModule.run(AuthEffects)
];

if (__DEV__ || localStorage.getItem('debug') === "true") { // will be removed by minification
  const StoreDevtoolsModule = require('@ngrx/store-devtools').StoreDevtoolsModule;
  modules.push(StoreDevtoolsModule.instrumentOnlyWithExtension())
}

export const STORE = modules;