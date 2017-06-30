import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _take from 'lodash/take';
import _without from 'lodash/without';

import { AppState, ITweet, IUsersState } from '../../reducers';
import { fetchFeed, fetchedFeed, errorFeed } from '../../actions';
import { TwitterProvider } from './../twitter/twitter';
import { createTweetObject } from '../tweet/tweet';
/*
  Generated class for the FeedProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FeedProvider {
  constructor(
    public store: Store<AppState>,
    private twitterProvider: TwitterProvider,
  ) {
    console.log('Hello FeedProvider Provider');
  }

  isFetching$(): Observable<boolean> {
    return this.store.select(state => state.feed.fetching);
  }

  getFeed$(): Observable<string[]> {
    return this.store.select(state => state.feed.list);
  }

  getFeedPaginated$(pageBSubject: BehaviorSubject<number>, perPage: number = 10, ): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.store.select(state => state.feed.list),
      this.store.select(state => state.tweets),
      this.store.select(state => state.users),
      pageBSubject,
      (feed: ITweet[], tweets: ITweet[], users: IUsersState, page) => _without(_take(feed, page * perPage)
        .map(tweetId => createTweetObject(tweets[tweetId], tweets, users)), null)
    );
  }

  getLastTweetId(): string {
    let lastItem: string;
    this.getFeed$()
      .first()
      .subscribe((items: string[]) => (lastItem = items[items.length - 1]));
    return lastItem;
  }

  hasFeed(): boolean {
    let hasFeed: boolean;
    this.getFeed$()
      .first()
      .subscribe((items: string[]) => (hasFeed = items.length !== 0));
    return hasFeed;
  }

  feedLength(): number {
    let feedLength: number;
    this.getFeed$()
      .first()
      .subscribe((items: string[]) => (feedLength = items.length));
    return feedLength;
  }

  fetch$() {
    this.store.dispatch(fetchFeed());
    return this.twitterProvider
      .getFeed$({ include_entities: true })
      .debounceTime(500)
      .map(feed => this.store.dispatch(fetchedFeed(feed, true)))
      .catch(error => {
        console.error('fetch$', error)
        this.store.dispatch(errorFeed());
        return Observable.of(null);
      });
  }

  fetchNextPage$() {
    const lastTweetId = this.getLastTweetId();
    if (!lastTweetId) return Observable.of(null);
    this.store.dispatch(fetchFeed());
    return this.twitterProvider
      .getFeed$({ max_id: lastTweetId, include_entities: true })
      .debounceTime(500)
      .map(feed => this.store.dispatch(fetchedFeed(feed)))
      .catch(error => {
        console.error('fetchNextPage$', error)
        this.store.dispatch(errorFeed());
        return Observable.of(null);
      });
  }
}
