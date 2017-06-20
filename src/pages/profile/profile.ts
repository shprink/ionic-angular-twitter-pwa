import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ITwitterUser } from './../../reducers';
import { UsersProvider } from './../../providers';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'profile/:handle'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  handle: string;
  user$: Observable<ITwitterUser>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usersProvider: UsersProvider,
  ) {
  }

  ionViewDidLoad() {
    this.handle = this.navParams.get('handle');
    this.user$ = this.usersProvider.getUserById$(this.handle);

    if (!this.usersProvider.doesUserExist(this.handle)) {
      this.usersProvider.fetchUser$(this.handle)
        .first()
        .subscribe(() => { }, error => console.log('fetchUser error', error));
    }
  }

}
