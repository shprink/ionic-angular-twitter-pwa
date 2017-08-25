import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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

if (localStorage.getItem('debug') === "true") {
  modules.push(StoreDevtoolsModule.instrumentOnlyWithExtension())
}

export const STORE = modules;