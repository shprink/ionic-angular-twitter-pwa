import { Observable } from 'rxjs/Observable';
import { Component, Input } from '@angular/core';
import { Nav } from 'ionic-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';

import { TwitterProvider } from './../../providers/twitter/twitter';
import { ITwitterUser, AppState } from './../../reducers';

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
  user$: Observable<ITwitterUser>;
  @Input() content: Nav;

  constructor(
    public twitter: TwitterProvider,
    public store: Store<AppState>,
  ) {
    console.log('Hello MenuComponent Component', this.content);
  }

  ngOnInit() {
    this.user$ = Observable.combineLatest(
      this.store.select(state => state.auth.provider),
      this.store.select(state => state.users),
      (provider, users: any) => provider && _get(users, `[${provider.uid}]`)
    );
  }

  goToProfile() {
    let id = null;
    this.user$.first().subscribe(user => id = user.id)
    this.content.push('ProfilePage', { id });
  }

  logout() {
    this.twitter.logout();
  }

}
