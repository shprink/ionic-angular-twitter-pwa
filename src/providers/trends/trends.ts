import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import fnsParse from 'date-fns/parse';
import fnsDiffInMinutes from 'date-fns/difference_in_minutes';

import { AppState, ITrends, ITrendingHashtag } from '../../reducers';
import { addTrends } from '../../actions';
import { TwitterProvider } from './../twitter/twitter';
/*
  Generated class for the TrendsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const REFRESH_TRENDS_INTERVAL = 5; // in minutes

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
    this.store
      .select(state => state.trends)
      .first()
      .subscribe((trendsState: ITrends) => (trends = trendsState));
    return trends;
  }

  getTrendsHashtags$(): Observable<ITrendingHashtag[]> {
    return this.store.select(state => state.trends.hashtags);
  }

  getTrendsAsOf$(): Observable<string> {
    return this.store.select(state => state.trends.as_of);
  }

  getTrendsAsOf(): string {
    let as_of: string;
    this.getTrendsAsOf$().first().subscribe(date => (as_of = date));
    return as_of;
  }

  hasTrendingHashtags(): boolean {
    let hasTrendingHashtags: boolean;
    this.getTrendsHashtags$()
      .first()
      .subscribe(
        (hashtags: ITrendingHashtag[]) =>
          (hasTrendingHashtags = hashtags.length !== 0),
      );
    return hasTrendingHashtags;
  }

  fetch$() {
    const date = fnsParse(this.getTrendsAsOf());
    if (fnsDiffInMinutes(Date.now(), date) < REFRESH_TRENDS_INTERVAL) {
      console.info(`Trends created less than ${REFRESH_TRENDS_INTERVAL} min ago, keeping existing data`);
      return Observable.of(null);
    }
    return this.twitterProvider
      .getTrends$()
      .map(trends => this.store.dispatch(addTrends(trends)));
  }
}
