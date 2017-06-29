import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import _slice from 'lodash/slice';
import _uniq from 'lodash/uniq';
import _pickBy from 'lodash/pickBy';

import { AppState, IAuthState, IFeed, IUsersState, ITrends, IMentions, ITweet } from './../../reducers';
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

    this.store.select('trends').skip(1).debounceTime(500).subscribe((trends: ITrends) => {
      console.log('saving trends');
      this.storage.set('trends', trends);
    });

    this.store.select(state => state).skip(1).debounceTime(500).subscribe(this.cleanupAndSaveState);

    window.onbeforeunload = () => {
      this.store.dispatch({ type: ON_BEFORE_UNLOAD });
    };
  }

  cleanupAndSaveState = (state: AppState) => {
    console.log('saving state');
    // FEED
    const first20Feed = _slice(state.feed.list, 0, 20);
    this.storage.set('feed', { fetching: false, list: first20Feed });

    // MENTION
    const first20Mentions = _slice(state.mentions.list, 0, 20);
    this.storage.set('mentions', { fetching: false, list: first20Mentions });

    // TWEETS
    const tweetIdsToKeep = _uniq([...first20Feed, ...first20Mentions]);
    const tweetsToKeep = _pickBy(state.tweets, (v, k) => tweetIdsToKeep.includes(k));
    const retweetIdsToKeep = Object.values(tweetsToKeep)
      .filter(tweet => tweet.retweeted_status_id).map(tweet => tweet.retweeted_status_id);
    const retweetsToKeep = _pickBy(state.tweets, (v, k) => retweetIdsToKeep.includes(k));
    const tweetsState = { ...tweetsToKeep, ...retweetsToKeep };
    this.storage.set('tweets', tweetsState);

    // USERS
    const userHandlesToKeep = Object.values(tweetsState).map(tweet => tweet.userHandle);
    const usersToKeep = _pickBy(state.users, (v, k) => userHandlesToKeep.includes(k));
    this.storage.set('users', usersToKeep);
  }
}