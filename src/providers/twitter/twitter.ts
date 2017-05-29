import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import * as firebase from 'firebase/app';

import { setAuthUser, setAuthCredential, logout } from '../../actions';
import { AppState, ICredential, IAuthState } from '../../reducers';
/*
  Generated class for the TwitterProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TwitterProvider {
  constructor(
    public afAuth: AngularFireAuth,
    public http: Http,
    public store: Store<AppState>,
  ) {
    console.log('eeeeeee')
    afAuth.authState.distinctUntilChanged().subscribe((user) => {
      if (!user) return;

      this.store.dispatch(setAuthUser(user.toJSON()));
      let credential = null;
      this.store.select(state => state.auth.credential).first().subscribe((cred: ICredential) => credential = cred);
      if (!credential) {
        this.logout();
        return;
      }

      this.afAuth.auth.signInAndRetrieveDataWithCredential(
        firebase.auth.TwitterAuthProvider.credential(credential.access_token_key, credential.access_token_secret)
      ).then(
        result => this.storeCredential(result.credential),
        error => this.logout());
    });
  }

  storeCredential({ accessToken, secret }) {
    this.store.dispatch(setAuthCredential({
      access_token_key: accessToken,
      access_token_secret: secret
    }));
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(state => state.auth)
      .map(({ user, credential }: IAuthState) => user !== null && credential !== null);
  }

  login(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(result => this.storeCredential(result.credential));
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.store.dispatch(logout());
  }

  getRequestOptions() {
    const headers = new Headers();

    let authData: IAuthState;
    this.store.select(state => state.auth).first().subscribe((auth: IAuthState) => authData = auth);
    const { user: { stsTokenManager: { accessToken } }, credential } = authData;
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${accessToken},${credential.access_token_key},${credential.access_token_secret}`);
    return new RequestOptions({ headers });
  }

  getDirectMessages() {
    return this.http.post(`${__APIURI__}api/timeline`, {}, this.getRequestOptions());
  }

  getTimeline() {
    return this.http.post(`${__APIURI__}api/messages`, {}, this.getRequestOptions());
  }

  tweet(status) {
    return this.http.post(`${__APIURI__}api/tweet`, { status }, this.getRequestOptions());
  }

}
