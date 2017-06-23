import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
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
  ) {
    console.log('Hello TweetProvider Provider');
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
