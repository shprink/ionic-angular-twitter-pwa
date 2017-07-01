import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

import { AppState, ITwitterUser, ITrends } from '../../reducers';
import { AuthProvider } from './../auth/auth';

const authRequiredError = { error: 'Auth is required' };
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
  ) { }

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
  getFeed$(options = {}): Observable<any> {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/feed`, options,
        this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  /**
    * Get mentions timeline
    *
    * @param count
    * @param since_id  more recent than
    * @param max_id older than
    */
  getMentions$(options = {}): Observable<any> {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/mentions`, options,
        this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  getTimeline$(screen_name, options = {}): Observable<any> {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/timeline`, { ...options, screen_name },
        this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  getTrends$(): Observable<ITrends> { // do not allow localized trending topics for now
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/trending`, {},
        this.getRequestOptions())
        .map(res => res.json())
        .map(res => res[0])
      : Observable.throw(authRequiredError);
  }

  tweet(status, in_reply_to_status_id?) {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/tweet`, { status, in_reply_to_status_id }, this.getRequestOptions())
        .map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  getOpenGraphData(url) {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/og-scrapper`, {
        url
      }, this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  getUser$(screen_name?): Observable<ITwitterUser> {
    const provider = this.authProvider.getProvider();
    const params = screen_name
      ? { screen_name }
      : { user_id: provider && provider.uid };

    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/user`, params,
        this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  search$(q, type = 'popular', options = {}): Observable<any> {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/search/${type}`, { ...options, q: encodeURI(q) },
        this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  getFavoriteList$(id: string, options = {}): Observable<any> {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/favorites/list`, { ...options, id },
        this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  favorite$(handleDo: boolean = false, id): Observable<any> {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/favorites/${handleDo ? 'create' : 'destroy'}`, { id },
        this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }

  retweet$(handleDo: boolean = false, id): Observable<any> {
    return this.authProvider.isAuthenticated()
      ? this.http.post(`${__APIURI__}api/${handleDo ? 'retweet' : 'unretweet'}`, { id },
        this.getRequestOptions()).map(res => res.json())
      : Observable.throw(authRequiredError);
  }
}
