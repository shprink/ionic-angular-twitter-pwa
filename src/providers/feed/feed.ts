import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';

import { AppState, ITweet, IUsersState } from '../../reducers';
import { fetchFeed, fetchedFeed, errorFeed } from '../../actions';
import { TwitterProvider } from './../twitter/twitter';
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

  getFeed$(): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.store.select(state => state.feed.list),
      this.store.select(state => state.users),
      (feed: ITweet[], users: IUsersState) =>
        feed.map(feedItem => {
          feedItem.user = _get(users, `[${feedItem.userHandle}]`);
          return feedItem;
        }),
    );
  }

  getFeedPaginated$(
    pageBSubject: BehaviorSubject<number>,
    perPage: number = 10,
  ): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.store.select(state => state.feed.list),
      this.store.select(state => state.users),
      pageBSubject,
      (feed: ITweet[], users: IUsersState, page) =>
        _take(feed, page * perPage).map(feedItem => {
          feedItem.user = _get(users, `[${feedItem.userHandle}]`);
          return feedItem;
        }),
    );
  }

  getLastFeedItem(): ITweet {
    let lastItem: ITweet;
    this.getFeed$()
      .first()
      .subscribe((items: ITweet[]) => (lastItem = items[items.length - 1]));
    return lastItem;
  }

  hasFeed(): boolean {
    let hasFeed: boolean;
    this.getFeed$()
      .first()
      .subscribe((items: ITweet[]) => (hasFeed = items.length !== 0));
    return hasFeed;
  }

  feedLength(): number {
    let feedLength: number;
    this.getFeed$()
      .first()
      .subscribe((items: ITweet[]) => (feedLength = items.length));
    return feedLength;
  }

  fetch$() {
    this.store.dispatch(fetchFeed());
    return this.twitterProvider
      .getFeed$({ include_entities: true })
      .debounceTime(500)
      .map(feed => this.store.dispatch(fetchedFeed(feed, true)))
      .catch(error => {
        this.store.dispatch(errorFeed());
        return Observable.of(null);
      });
  }

  fetchNextPage$() {
    const lastItem = this.getLastFeedItem();
    if (!lastItem) return Observable.of(null);
    this.store.dispatch(fetchFeed());
    return this.twitterProvider
      .getFeed$({ max_id: lastItem.id, include_entities: true })
      .debounceTime(500)
      .map(feed => this.store.dispatch(fetchedFeed(feed)))
      .catch(error => {
        this.store.dispatch(errorFeed());
        return Observable.of(null);
      });
  }
}
