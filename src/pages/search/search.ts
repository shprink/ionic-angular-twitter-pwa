import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { canEnterIfAuthenticated } from '../../decorators';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@canEnterIfAuthenticated
@IonicPage({
  segment: 'search/:query'
})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  query: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.query = decodeURIComponent(this.navParams.get('query'));
  }

}
