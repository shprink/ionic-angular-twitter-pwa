import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';

import { AppState, ITweet, IUsersState } from '../../reducers';
import { addFeed, resetFeed } from '../../actions';
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
    private twitterProvider: TwitterProvider
  ) {
    console.log('Hello FeedProvider Provider');
  }

  getFeed$() {
    return Observable.combineLatest(
      this.store.select(state => state.feed),
      this.store.select(state => state.users),
      (feed: ITweet[], users: IUsersState) => feed.map((feedItem) => {
        feedItem.user = _get(users, `[${feedItem.userId}]`);
        return feedItem;
      })
    );
  }

  getLastFeedItem(): ITweet {
    let lastItem: ITweet;
    this.getFeed$().first().subscribe((items: ITweet[]) => lastItem = items[items.length - 1]);
    return lastItem;
  }

  hasFeed(): boolean {
    let hasFeed: boolean;
    this.getFeed$().first().subscribe((items: ITweet[]) => hasFeed = items.length !== 0);
    return hasFeed;
  }

  reset() {
    return this.twitterProvider.getFeed({ include_entities: true })
      .map(feed => this.store.dispatch(resetFeed(feed)));
  }

  getNextPage() {
    const lastItem = this.getLastFeedItem();
    return this.twitterProvider.getFeed({ max_id: lastItem.id, include_entities: true })
      .map(feed => this.store.dispatch(addFeed(feed)));
  }
}
