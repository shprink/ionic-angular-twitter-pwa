import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { UsersProvider } from './../../providers';
import { ITwitterUser } from './../../reducers';
/**
 * Generated class for the AvatarToolbarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'avatar-toolbar',
  templateUrl: 'avatar-toolbar.html'
})
export class AvatarToolbarComponent {
  user$: Observable<ITwitterUser>

  constructor(
    private menuCtrl: MenuController,
    private users: UsersProvider,
  ) { }

  ngOnInit() {
    this.user$ = this.users.getCurrentUser$();
  }

  openMenu() {
    this.menuCtrl.open();
  }

}
