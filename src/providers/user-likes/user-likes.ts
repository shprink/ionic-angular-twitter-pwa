import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _take from 'lodash/take';
import _get from 'lodash/get';
import _without from 'lodash/without';

import { AppState, ITweet, IUsersState } from '../../reducers';
import { fetchUserLikes, fetchedUserLikes, errorUserLikes } from '../../actions';
import { TwitterProvider } from './../twitter/twitter';
import { createTweetObject } from '../tweet/tweet';
/*
  Generated class for the UserLikesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserLikesProvider {
  constructor(
    public store: Store<AppState>,
    private twitterProvider: TwitterProvider,
  ) {
    console.log('Hello UserLikesProvider Provider');
  }

  isFetching$(username = ''): Observable<boolean> {
    return this.store.select(state => _get(state, `userLikes[${username}].fetching`, false));
  }

  getUserLikes$(username = ''): Observable<string[]> {
    return this.store.select(state => _get(state, `userLikes[${username}].list`, []));
  }

  getUserLikesPaginated$(username = '', pageBSubject: BehaviorSubject<number>, perPage: number = 10, ): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.getUserLikes$(username),
      this.store.select(state => state.tweets),
      this.store.select(state => state.users),
      pageBSubject,
      (feed: ITweet[], tweets: ITweet[], users: IUsersState, page) => _without(_take(feed, page * perPage)
        .map(tweetId => tweets[tweetId]
          ? createTweetObject(tweets[tweetId], tweets, users)
          : null
        ), null)
    );
  }

  getLastTweetId(username = ''): string {
    let lastItem: string;
    this.getUserLikes$(username)
      .first()
      .subscribe((items: string[]) => (lastItem = items[items.length - 1]));
    return lastItem;
  }

  hasUserLikes(username = ''): boolean {
    let hasUserLikes: boolean;
    this.getUserLikes$(username)
      .first()
      .subscribe((items: string[]) => (hasUserLikes = items.length !== 0));
    return hasUserLikes;
  }

  userLikesLength(username = ''): number {
    let userLikesLength: number;
    this.getUserLikes$(username)
      .first()
      .subscribe((items: string[]) => (userLikesLength = items.length));
    return userLikesLength;
  }

  fetch$(username) {
    this.store.dispatch(fetchUserLikes(username));
    return this.twitterProvider
      .getFavoriteList$(username, { include_entities: true })
      .debounceTime(500)
      .map(res => this.store.dispatch(fetchedUserLikes(username, res, true)))
      .catch(error => {
        console.error('fetch$', error)
        this.store.dispatch(errorUserLikes(username));
        return Observable.of(null);
      });
  }

  fetchNextPage$(username) {
    const lastTweetId = this.getLastTweetId(username);
    if (!lastTweetId) return Observable.of(null);
    this.store.dispatch(fetchUserLikes(username));
    return this.twitterProvider
      .getFavoriteList$(username, { max_id: lastTweetId, include_entities: true })
      .debounceTime(500)
      .map(res => this.store.dispatch(fetchedUserLikes(username, res)))
      .catch(error => {
        console.error('fetchNextPage$', error)
        this.store.dispatch(errorUserLikes(username));
        return Observable.of(null);
      });
  }
}
