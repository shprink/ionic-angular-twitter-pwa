import { Component, Injector } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TwitterProvider } from '../../providers';
import { canEnterIfAuthenticated } from '../../decorators';
/**
 * Generated class for the MessagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@canEnterIfAuthenticated
@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public twitter: TwitterProvider,
    public injector: Injector,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
    this.twitter.getDirectMessages().subscribe()
  }

}
