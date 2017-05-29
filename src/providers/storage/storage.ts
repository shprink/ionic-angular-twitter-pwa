import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage';
import { Store } from '@ngrx/store';

import { AppState, IAuthState } from './../../reducers';
import { INIT } from './../../actions';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {

  constructor(
    private store: Store<AppState>,
    public storage: IonicStorage
  ) { }

  init() {
    // POPULATE STORE
    // because this blocks => https://github.com/ngrx/store/pull/217
    let defaultState = {};
    const storagePromise = this.storage.forEach((val, key) => {
      defaultState[key] = JSON.parse(val);
    });

    return storagePromise
      .then(() => this.store.dispatch({ type: INIT, payload: defaultState }))
  }

  run() {
    this.store.select('auth').skip(1).debounceTime(500).subscribe((auth: IAuthState) => {
      console.log('saving auth');
      this.storage.set('auth', JSON.stringify(auth));
    });
  }
}