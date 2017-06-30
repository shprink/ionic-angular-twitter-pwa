import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _take from 'lodash/take';
import _get from 'lodash/get';
import _without from 'lodash/without';

import { AppState, ITweet, IUsersState } from '../../reducers';
import { fetchSearch, fetchedSearch, errorSearch } from '../../actions';
import { TwitterProvider } from './../twitter/twitter';
import { createTweetObject } from '../tweet/tweet';
/*
  Generated class for the SearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchProvider {
  constructor(
    public store: Store<AppState>,
    private twitterProvider: TwitterProvider,
  ) {
    console.log('Hello SearchProvider Provider');
  }

  isFetching$(term = ''): Observable<boolean> {
    return this.store.select(state => _get(state, `search[${term}].fetching`, false));
  }

  search$(term = ''): Observable<string[]> {
    return this.store.select(state => _get(state, `search[${term}].list`, []));
  }

  getSearchPaginated$(term = '', pageBSubject: BehaviorSubject<number>, perPage: number = 10, ): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.search$(term),
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

  getLastTweetId(term = ''): string {
    let lastItem: string;
    this.search$(term)
      .first()
      .subscribe((items: string[]) => (lastItem = items[items.length - 1]));
    return lastItem;
  }

  hasSearch(term = ''): boolean {
    let hasSearch: boolean;
    this.search$(term)
      .first()
      .subscribe((items: string[]) => (hasSearch = items.length !== 0));
    return hasSearch;
  }

  searchLength(term = ''): number {
    let searchLength: number;
    this.search$(term)
      .first()
      .subscribe((items: string[]) => (searchLength = items.length));
    return searchLength;
  }

  fetch$(term) {
    this.store.dispatch(fetchSearch(term));
    return this.twitterProvider
      .search$(term, 'popular', { include_entities: true })
      .debounceTime(500)
      .map(res => this.store.dispatch(fetchedSearch(term, res.statuses, true)))
      .catch(error => {
        console.error('fetch$', error)
        this.store.dispatch(errorSearch(term));
        return Observable.of(null);
      });
  }

  fetchNextPage$(term) {
    const lastTweetId = this.getLastTweetId(term);
    if (!lastTweetId) return Observable.of(null);
    this.store.dispatch(fetchSearch(term));
    return this.twitterProvider
      .search$(term, 'popular', { max_id: lastTweetId, include_entities: true })
      .debounceTime(500)
      .map(res => this.store.dispatch(fetchedSearch(term, res.statuses)))
      .catch(error => {
        console.error('fetchNextPage$', error)
        this.store.dispatch(errorSearch(term));
        return Observable.of(null);
      });
  }
}
