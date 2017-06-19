import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage';
import { Store } from '@ngrx/store';

import { AppState, IAuthState, ITweet, IUsersState, ITrends } from './../../reducers';
import { INIT, ON_BEFORE_UNLOAD } from './../../actions';

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

    this.store.select('feed').skip(1).debounceTime(500).subscribe((feed: ITweet[]) => {
      console.log('saving feed');
      this.storage.set('feed', JSON.stringify(feed));
    });

    this.store.select('users').skip(1).debounceTime(500).subscribe((users: IUsersState) => {
      console.log('saving users');
      this.storage.set('users', JSON.stringify(users));
    });

    this.store.select('trends').skip(1).debounceTime(500).subscribe((trends: ITrends) => {
      console.log('saving trends');
      this.storage.set('trends', JSON.stringify(trends));
    });

    window.onbeforeunload = () => this.store.dispatch({ type: ON_BEFORE_UNLOAD });
  }
}