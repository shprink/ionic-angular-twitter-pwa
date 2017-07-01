import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _take from 'lodash/take';
import _get from 'lodash/get';
import _without from 'lodash/without';

import { AppState, ITweet, IUsersState } from '../../reducers';
import { fetchUserTweets, fetchedUserTweets, errorUserTweets } from '../../actions';
import { TwitterProvider } from './../twitter/twitter';
import { createTweetObject } from '../tweet/tweet';
/*
  Generated class for the UserTweetsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserTweetsProvider {
  constructor(
    public store: Store<AppState>,
    private twitterProvider: TwitterProvider,
  ) {
    console.log('Hello UserTweetsProvider Provider');
  }

  isFetching$(username = ''): Observable<boolean> {
    return this.store.select(state => _get(state, `userTweets[${username}].fetching`, false));
  }

  getUserTweets$(username = ''): Observable<string[]> {
    return this.store.select(state => _get(state, `userTweets[${username}].list`, []));
  }

  getUserTweetsPaginated$(username = '', pageBSubject: BehaviorSubject<number>, perPage: number = 10, ): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.getUserTweets$(username),
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
    this.getUserTweets$(username)
      .first()
      .subscribe((items: string[]) => (lastItem = items[items.length - 1]));
    return lastItem;
  }

  hasUserTweets(username = ''): boolean {
    let hasUserTweets: boolean;
    this.getUserTweets$(username)
      .first()
      .subscribe((items: string[]) => (hasUserTweets = items.length !== 0));
    return hasUserTweets;
  }

  userTweetsLength(username = ''): number {
    let userTweetsLength: number;
    this.getUserTweets$(username)
      .first()
      .subscribe((items: string[]) => (userTweetsLength = items.length));
    return userTweetsLength;
  }

  fetch$(username) {
    this.store.dispatch(fetchUserTweets(username));
    return this.twitterProvider
      .getTimeline$(username, { include_entities: true })
      .debounceTime(500)
      .map(res => this.store.dispatch(fetchedUserTweets(username, res, true)))
      .catch(error => {
        console.error('fetch$', error)
        this.store.dispatch(errorUserTweets(username));
        return Observable.of(null);
      });
  }

  fetchNextPage$(username) {
    const lastTweetId = this.getLastTweetId(username);
    if (!lastTweetId) return Observable.of(null);
    this.store.dispatch(fetchUserTweets(username));
    return this.twitterProvider
      .getTimeline$(username, { max_id: lastTweetId, include_entities: true })
      .debounceTime(500)
      .map(res => this.store.dispatch(fetchedUserTweets(username, res)))
      .catch(error => {
        console.error('fetchNextPage$', error)
        this.store.dispatch(errorUserTweets(username));
        return Observable.of(null);
      });
  }
}
