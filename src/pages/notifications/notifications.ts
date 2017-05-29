import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { canEnterIfAuthenticated } from '../../decorators';
/**
 * Generated class for the NotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@canEnterIfAuthenticated
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}
