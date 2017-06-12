import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';

import { AppState, ITrends, ITrendingHashtag } from '../../reducers';
import { addTrends } from '../../actions';
import { TwitterProvider } from './../twitter/twitter';
/*
  Generated class for the TrendsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrendsProvider {

  constructor(
    public store: Store<AppState>,
    private twitterProvider: TwitterProvider,
  ) {
    console.log('Hello TrendsProvider Provider');
  }

  getTrends$(): Observable<ITrends> {
    return this.store.select(state => state.trends);
  }

  getTrends(): ITrends {
    let trends: ITrends;
    this.store.select(state => state.trends).first()
      .subscribe((trendsState: ITrends) => trends = trendsState);
    return trends;
  }

  getTrendingHashtags$(): Observable<ITrendingHashtag[]> {
    return this.store.select(state => state.trends.hashtags);
  }

  hasTrendingHashtags(): boolean {
    let hasTrendingHashtags: boolean;
    this.getTrendingHashtags$().first()
      .subscribe((hashtags: ITrendingHashtag[]) => hasTrendingHashtags = hashtags.length !== 0);
    return hasTrendingHashtags;
  }

  fetch$() {
    return this.twitterProvider.getTrends$()
      .map(trends => { console.log(trends), this.store.dispatch(addTrends(trends)) });
  }
}
