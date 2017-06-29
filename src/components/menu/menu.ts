import { Observable } from 'rxjs/Observable';
import { Component, Input } from '@angular/core';
import { Nav } from 'ionic-angular';

import { UsersProvider, AuthProvider } from './../../providers';
import { ITwitterUser } from './../../reducers';

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
    public authProvider: AuthProvider,
    public usersProvider: UsersProvider,
  ) {
    console.log('Hello MenuComponent Component', this.content);
  }

  ngOnInit() {
    this.user$ = this.usersProvider.getCurrentUser$();
  }

  goToProfile = (e) => {
    const { screen_name } = this.usersProvider.getCurrentUser();
    this.content.push('ProfilePage', { handle: screen_name });
  }

  logout() {
    this.authProvider.logout();
    this.content.setRoot('LoginPage')
  }

}
