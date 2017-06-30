import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';
import _without from 'lodash/without';

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

  getFeed$(): Observable<string[]> {
    return this.store.select(state => state.mentions.list);
  }

  getMentionsPaginated$(pageBSubject: BehaviorSubject<number>, perPage: number = 10, ): Observable<ITweet[]> {
    return Observable.combineLatest(
      this.store.select(state => state.mentions.list),
      this.store.select(state => state.tweets),
      this.store.select(state => state.users),
      pageBSubject,
      (feed: ITweet[], tweets: ITweet[], users: IUsersState, page) => _without(_take(feed, page * perPage)
        .map(tweetId => {
          const tweet = tweets[tweetId];
          if (!tweet) return null;
          return {
            ...tweet, // avoid state mutation
            user: users[tweet.userHandle.toLowerCase()]
          };
        }), null)
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
    this.store.dispatch(fetchMentions());
    return this.twitterProvider
      .getMentions$({ include_entities: true })
      .debounceTime(500)
      .map(feed => this.store.dispatch(fetchedMentions(feed, true)))
      .catch(error => {
        console.error('fetch$', error)
        this.store.dispatch(errorMentions());
        return Observable.of(null);
      });
  }

  fetchNextPage$() {
    const lastTweetId = this.getLastTweetId();
    if (!lastTweetId) return Observable.of(null);
    this.store.dispatch(fetchMentions());
    return this.twitterProvider
      .getMentions$({ max_id: lastTweetId, include_entities: true })
      .debounceTime(500)
      .map(feed => this.store.dispatch(fetchedMentions(feed)))
      .catch(error => {
        console.error('fetchNextPage$', error)
        this.store.dispatch(errorMentions());
        return Observable.of(null);
      });
  }

}
