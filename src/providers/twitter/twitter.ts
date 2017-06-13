import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

import { AppState, ITwitterUser, ITrends } from '../../reducers';
import { AuthProvider } from './../auth/auth';

/*
  Generated class for the TwitterProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TwitterProvider {
  constructor(
    public http: Http,
    public store: Store<AppState>,
    public platform: Platform,
    public authProvider: AuthProvider,
  ) {  }

  getRequestOptions() {
    const headers = new Headers();
    const { stsTokenManager: { accessToken } } = this.authProvider.getUser();
    const { access_token_key, access_token_secret } = this.authProvider.getCredential();

    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${accessToken},${access_token_key},${access_token_secret}`);
    return new RequestOptions({ headers });
  }

  getDirectMessages() {
    return this.http.post(`${__APIURI__}api/messages`, {}, this.getRequestOptions()).map(res => res.json());
  }

  /**
   * Get home timeline
   *
   * @param count
   * @param since_id  more recent than
   * @param max_id older than
   */
  getFeed$(options = {}) {
    return this.http.post(`${__APIURI__}api/feed`, options, this.getRequestOptions())
      .map(res => res.json());
  }

  getTimeline(user_id, count = 5) {
    return this.http.post(`${__APIURI__}api/timeline`, {
      user_id, count
    }, this.getRequestOptions()).map(res => res.json());
  }

  getTrends$(): Observable<ITrends> { // do not allow localized trending topics for now
    return this.http.post(`${__APIURI__}api/trending`, {},
      this.getRequestOptions())
      .map(res => res.json())
      .map(res => res[0]);
  }

  tweet(status) {
    return this.http.post(`${__APIURI__}api/tweet`, { status }, this.getRequestOptions()).map(res => res.json());
  }

  getOpenGraphData(url) {
    return this.http.post(`${__APIURI__}api/og-scrapper`, {
      url
    }, this.getRequestOptions()).map(res => res.json());
  }

  getUser$(screen_name?): Observable<ITwitterUser> {
    const params = screen_name
      ? { screen_name }
      : { user_id: this.authProvider.getProvider().uid }
    return this.http.post(`${__APIURI__}api/user`, params,
      this.getRequestOptions()).map(res => res.json());
  }

  getMentions$(): Observable<any> {
    return this.http.post(`${__APIURI__}api/mentions`, {},
      this.getRequestOptions()).map(res => res.json());
  }

}
