import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Platform, ToastController } from 'ionic-angular';

import { AppState, ITwitterUser } from '../../reducers';
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
    public toastCtrl: ToastController,
  ) {
    console.log('__APIURI__', __APIURI__)
  }

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
  getFeed(options = {}) {
    return this.http.post(`${__APIURI__}api/feed`, options, this.getRequestOptions())
      .map(res => res.json())
      .catch(res => {
        console.log('res', res)
        const error = res.json()[0];
        this.showToast(error.message);
        return Observable.throw(error);
      });
  }

  getTimeline(user_id, count = 5) {
    return this.http.post(`${__APIURI__}api/timeline`, {
      user_id, count
    }, this.getRequestOptions()).map(res => res.json());
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

  showToast(message): void {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

}
