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
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user$: Observable<ITwitterUser>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private users: UsersProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user$ = this.users.getUserById$(this.navParams.get('id'));
  }

}
