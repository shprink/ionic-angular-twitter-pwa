import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

import { AppState, IUser, ICredential, IAuthState } from '../../reducers';
import { TwitterProvider } from './../twitter/twitter';
import {
  addAuthUser, addAuthCredential,
  cleanAuth, logout, addTwitterUser, login
} from '../../actions';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public store: Store<AppState>,
    // public twitterProvider: TwitterProvider,
  ) { }

  run() {
    this.afAuth.authState.distinctUntilChanged().subscribe((user) => {
      console.log('distinctUntilChanged user', user)
      if (!user) return;
      const credential = this.getCredential();
      console.log('distinctUntilChanged credential', credential)
      if (!credential) {
        this.logout();
        return;
      }

      // this.store.dispatch(addAuthUser(user.toJSON()));
      console.log('distinctUntilChanged signInAndRetrieveDataWithCredential', credential)
      this.afAuth.auth.signInAndRetrieveDataWithCredential(
        firebase.auth.TwitterAuthProvider.credential(credential.access_token_key, credential.access_token_secret)
      ).then(
        result => this.store.dispatch(login(user.toJSON(), result.credential)),
        error => this.logout());
    }, () => {
      this.store.dispatch(cleanAuth());
    });
  }

  login(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(result => this.store.dispatch(addAuthCredential(result.credential)));
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.store.dispatch(logout());
  }

  isAuthenticated$(): Observable<boolean> {
    return this.store.select(state => state.auth)
      .map(({ credential }: IAuthState) => credential !== null);
  }

  isAuthenticated(): boolean {
    let isAuthenticated;
    this.isAuthenticated$().first().subscribe(isAuth => isAuthenticated = isAuth);
    return isAuthenticated;
  }

  getCredential$(): Observable<ICredential> {
    return this.store.select(state => state.auth.credential);
  }

  getCredential(): ICredential {
    let credentialData: ICredential;
    this.getCredential$().first().subscribe((credential: ICredential) => { console.log('credential2', credential); return credentialData = credential });
    return credentialData;
  }

  getUser$(): Observable<IUser> {
    return this.store.select(state => state.auth.user);
  }

  getUser(): IUser {
    let userData: IUser;
    this.getUser$().first().subscribe((user: IUser) => userData = user);
    return userData;
  }

  getProvider$(): Observable<firebase.UserInfo> {
    return this.store.select(state => state.auth.provider);
  }

  getProvider(): firebase.UserInfo {
    let providerData: firebase.UserInfo;
    this.getProvider$().first().subscribe((provider: firebase.UserInfo) => providerData = provider);
    return providerData;
  }

}
