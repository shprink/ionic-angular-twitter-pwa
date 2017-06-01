import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppState, ITwitterUser } from './../../reducers';
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
    public store: Store<AppState>,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.user$ = this.store.select(state => state.users).map(users => users[this.navParams.get('id')])
  }

}
