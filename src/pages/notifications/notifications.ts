import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TwitterProvider } from './../../providers';
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
    public twitterProvider: TwitterProvider,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    this.twitterProvider.getMentions$().subscribe();
  }
}
