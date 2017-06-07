import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { canEnterIfAuthenticated } from '../../decorators';
/**
 * Generated class for the SearchTabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@canEnterIfAuthenticated
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search-tab.html',
})
export class SearchTabPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTabPage');
  }

}
