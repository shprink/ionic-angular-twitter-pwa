import { Observable } from 'rxjs/Observable';
import { Component, Injector } from '@angular/core';
import {
  App, IonicPage, NavController,
  NavParams, ModalController, Refresher
} from 'ionic-angular';

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
  selector: 'page-search-tab',
  templateUrl: 'search-tab.html',
})
export class SearchTabPage {
  trendingHashtags$: Observable<ITrendingHashtag[]>
  fetching$: Observable<boolean>;
  searchTerm: string;

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
    this.trendingHashtags$ = this.trendsProvider.getTrendsHashtags$();
    this.fetching$ = this.trendsProvider.isFetching$();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave SearchTabPage');
  }

  ionViewWillEnter() {
    const canFetch = this.trendsProvider.canFetchNewContent();
    if (canFetch) {
      console.log('init')
      this.trendsProvider
        .fetch$()
        .first()
        .subscribe(() => { }, error => console.log('trends error', error));
    }
  }

  refresh(refresher: Refresher) {
    console.log('refresh')
    this.trendsProvider
      .fetch$()
      .first()
      .finally(() => refresher.complete())
      .subscribe(() => { }, error => console.log('trends error', error));
  }

  searchFromInput(e) {
    this.appCtrl.getRootNav().push('SearchPage', { query: encodeURIComponent(this.searchTerm) });
    this.searchTerm = '';
  }

  search(item) {
    this.appCtrl.getRootNav().push('SearchPage', { query: item.query });
  }
}
