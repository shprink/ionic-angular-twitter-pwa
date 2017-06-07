import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, IFeedItem } from '../../reducers';
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
    return this.store.select(state => state.feed)
  }

  getLastFeedItem(): IFeedItem {
    let lastItem: IFeedItem;
    this.getFeed$().first().subscribe((items: IFeedItem[]) => lastItem = items[items.length - 1]);
    return lastItem;
  }

  hasFeed(): boolean {
    let hasFeed: boolean;
    this.getFeed$().first().subscribe((items: IFeedItem[]) => hasFeed = items.length !== 0);
    return hasFeed;
  }

  reset() {
    return this.twitterProvider.getFeed()
      .map(feed => this.store.dispatch(resetFeed(feed)));
  }

  getNextPage() {
    const lastItem = this.getLastFeedItem();
    return this.twitterProvider.getFeed({ max_id: lastItem.id })
      .map(feed => this.store.dispatch(addFeed(feed)));
  }
}
