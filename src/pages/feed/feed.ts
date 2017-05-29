import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { canEnterIfAuthenticated, bindOpenMenu } from '../../decorators';
import { AppState } from '../../reducers';
import { TwitterProvider } from '../../providers/twitter/twitter';

/**
 * Generated class for the FeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@canEnterIfAuthenticated
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<AppState>,
    public twitter: TwitterProvider,
    public injector: Injector,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }
}
