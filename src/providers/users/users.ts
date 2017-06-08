import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';

import { AppState, ITwitterUser } from '../../reducers';
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersProvider {

  constructor(
    public store: Store<AppState>,
  ) {
    console.log('Hello UsersProvider Provider');
  }

  getCurrentUser$() {
    return Observable.combineLatest(
      this.store.select(state => state.auth.screen_name),
      this.store.select(state => state.users),
      (screen_name, users: any) => screen_name && _get(users, `[${screen_name}]`)
    );
  }

  getCurrentUser() {
    let user;
    this.getCurrentUser$().first().subscribe((u: ITwitterUser) => user = u);
    return user;
  }

  getUserById$(id: string) {
    return this.store.select(state => state.users[id]);
  }

}
