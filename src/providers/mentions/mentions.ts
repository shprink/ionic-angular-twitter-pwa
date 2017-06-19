import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';

import { AppState, ITweet, IUsersState } from '../../reducers';
import { fetchMentions, fetchedMentions, errorMentions } from '../../actions';
import { TwitterProvider } from './../twitter/twitter';
/*
  Generated class for the MentionsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MentionsProvider {

  constructor(
    public store: Store<AppState>,
    private twitterProvider: TwitterProvider,
  ) {
    console.log('Hello MentionsProvider Provider');
  }

  isFetching$(): Observable<boolean> {
    return this.store.select(state => state.mentions.fetching);
  }

  getFeed$(): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.store.select(state => state.mentions.list),
      this.store.select(state => state.users),
      (feed: ITweet[], users: IUsersState) =>
        feed.map(feedItem => {
          feedItem.user = _get(users, `[${feedItem.userHandle}]`);
          return feedItem;
        }),
    );
  }

  getMentionsPaginated$(
    pageBSubject: BehaviorSubject<number>,
    perPage: number = 10,
  ): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.store.select(state => state.mentions.list),
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
    this.store.dispatch(fetchMentions());
    return this.twitterProvider
      .getMentions$({ include_entities: true })
      .debounceTime(500)
      .map(feed => this.store.dispatch(fetchedMentions(feed, true)))
      .catch(error => {
        this.store.dispatch(errorMentions());
        return Observable.of(null);
      });
  }

  fetchNextPage$() {
    const lastItem = this.getLastFeedItem();
    this.store.dispatch(fetchMentions());
    return this.twitterProvider
      .getMentions$({ max_id: lastItem.id, include_entities: true })
      .debounceTime(500)
      .map(feed => this.store.dispatch(fetchedMentions(feed)))
      .catch(error => {
        this.store.dispatch(errorMentions());
        return Observable.of(null);
      });
  }

}
