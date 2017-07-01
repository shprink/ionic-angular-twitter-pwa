import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, ITweet, IUsersState } from '../../reducers';
import {
  tweetFavorite, tweetUnfavorite,
  tweetRetweet, tweetUnretweet
} from '../../actions';
import { TwitterProvider } from './../twitter/twitter';


/*
  Generated class for the TweetProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TweetProvider {

  constructor(
    public store: Store<AppState>,
    private twitterProvider: TwitterProvider,
  ) { }

  getById$(id_str): Observable<ITweet> {
    return Observable.combineLatest(
      this.store.select(state => state.tweets[id_str]),
      this.store.select(state => state.tweets),
      this.store.select(state => state.users),
      (tweet: ITweet, tweets: ITweet[], users: IUsersState) => createTweetObject(tweet, tweets, users));
  }

  favorite$(handleDo, id) {
    return this.twitterProvider.favorite$(handleDo, id)
      .debounceTime(500)
      .map(tweet => this.store.dispatch(handleDo ? tweetFavorite(tweet) : tweetUnfavorite(tweet)));
  }

  retweet$(handleDo, id) {
    return this.twitterProvider.retweet$(handleDo, id)
      .debounceTime(500)
      .map(tweet => this.store.dispatch(handleDo ? tweetRetweet(tweet, id) : tweetUnretweet(tweet, id)));
  }

}

export function createTweetObject(tweet: ITweet, tweets, users) {
  if (!tweet) return null;
  let tweetWithEntities = {
    ...tweet, // avoid state mutation
    user: users[tweet.userHandle.toLowerCase()],
  }
  if (tweet.retweeted_status_id) {
    const retweeted_status = tweets[tweet.retweeted_status_id];
    tweetWithEntities.retweeted_status = {
      ...retweeted_status,
      user: users[retweeted_status.userHandle.toLowerCase()]
    }
  }
  return tweetWithEntities;
}