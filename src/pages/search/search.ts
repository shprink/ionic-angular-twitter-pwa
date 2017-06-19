import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { canEnterIfAuthenticated } from '../../decorators';
import { TwitterProvider } from './../../providers';
import { ITweet } from './../../reducers';
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
  isFetching: boolean;
  next_results: string;
  searchTermSubject = new Subject<string>();
  results: ITweet[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
    public twitter: TwitterProvider
  ) {
  }

  ionViewDidLoad() {
    this.query = decodeURIComponent(this.navParams.get('query'));

    this.searchTermSubject
      .debounceTime(300)
      .map(query => { this.isFetching = true; return query; })
      .switchMap(query => this.twitter.search$(query))
      // .finally(() => { console.log('finally'); this.isFetching = false})
      .subscribe(response => {
        this.results = response.statuses;
        this.next_results = response.search_metadata.next_results;
        this.isFetching = false;
      }, () => this.isFetching = false);

    this.searchTermSubject.next(this.query);
  }

  search(e) {
    this.searchTermSubject.next(this.query);
  }

  refresh(refresher: Refresher) {
    console.log('refresh')
    refresher.complete();
  }

  loadMore(infiniteScroll: InfiniteScroll) {
    console.log('InfiniteScroll')
    infiniteScroll.complete();
  }

  trackById(index, item) {
    return item.id;
  }

}
