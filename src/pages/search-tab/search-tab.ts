import { Observable } from 'rxjs/Observable';
import { Component, Injector } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { canEnterIfAuthenticated } from '../../decorators';
import { TrendsProvider } from './../../providers';
import { ITrendingHashtag } from './../../reducers';
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
  trendingHashtags$: Observable<ITrendingHashtag[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
    public trendsProvider: TrendsProvider,
    private modalCtrl: ModalController,
    public appCtrl: App,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTabPage');
    this.trendingHashtags$ = this.trendsProvider.getTrendingHashtags$();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter SearchTabPage');
    this.trendsProvider.fetch$().first().subscribe();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave SearchTabPage');

  }

  search(item) {
    this.appCtrl.getRootNav().push('SearchPage', { query: item.query });
  }

  createTweet() {
    let tweetModal = this.modalCtrl.create('TweetPage')
    tweetModal.present();
  }
}
