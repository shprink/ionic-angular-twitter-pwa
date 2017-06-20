import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage';
import { Store } from '@ngrx/store';

import { AppState, IAuthState, IFeed, IUsersState, ITrends, IMentions } from './../../reducers';
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
      defaultState[key] = val;
    });

    return storagePromise
      .then(() => this.store.dispatch({ type: INIT, payload: defaultState }))
  }

  run() {
    this.store.select('auth').skip(1).debounceTime(500).subscribe((auth: IAuthState) => {
      console.log('saving auth');
      this.storage.set('auth', auth);
    });

    this.store.select('feed').skip(1).debounceTime(500).subscribe((feed: IFeed) => {
      console.log('saving feed');
      this.storage.set('feed', feed);
    });

    this.store.select('mentions').skip(1).debounceTime(500).subscribe((mentions: IMentions) => {
      console.log('saving mentions');
      this.storage.set('mentions', mentions);
    });

    this.store.select('users').skip(1).debounceTime(500).subscribe((users: IUsersState) => {
      console.log('saving users');
      this.storage.set('users', users);
    });

    this.store.select('trends').skip(1).debounceTime(500).subscribe((trends: ITrends) => {
      console.log('saving trends');
      this.storage.set('trends', trends);
    });

    window.onbeforeunload = () => {
      // cleanup the local storage when closing the app
      // to have a instant load on next bootstrap
      this.store.dispatch({ type: ON_BEFORE_UNLOAD });
      this.store.select('feed').first().subscribe((feed: IFeed) => this.storage.set('feed', feed));
      this.store.select('mentions').first().subscribe((mentions: IMentions) => this.storage.set('mentions', mentions));
    };
  }
}