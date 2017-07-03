import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Network } from '@ionic-native/network';

import * as firebase from 'firebase/app';

import { AppState, IUser, ICredential, IAuthState } from '../../reducers';
import {
  addAuthCredential,
  cleanAuth, logout, login
} from '../../actions';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  isOnline: boolean = navigator.onLine;

  constructor(
    public afAuth: AngularFireAuth,
    public store: Store<AppState>,
    private network: Network,
  ) {
    this.network.onConnect().subscribe(() => this.isOnline = true);
    this.network.onDisconnect().subscribe(() => this.isOnline = false);
  }

  run() {
    const credential = this.getCredential();
    if (credential) { // checking credential on app ready
      this.afAuth.auth.signInAndRetrieveDataWithCredential(
        firebase.auth.TwitterAuthProvider.credential(credential.access_token_key, credential.access_token_secret)
      ).then(
        result => this.store.dispatch(addAuthCredential(result.credential)),
        error => {
          // If offline we want the last user to stay logged in
          this.isOnline && this.logout()
        });
    } else {
      this.logout();
    }

    this.afAuth.authState.distinctUntilChanged().subscribe((user) => {
      console.log('authState user', user)
      if (!user) return;
      this.store.dispatch(login(user.toJSON()));
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
      .map(({ credential, user }: IAuthState) => credential !== null && user !== null);
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
    console.log('getProvider', providerData)
    return providerData;
  }

}
