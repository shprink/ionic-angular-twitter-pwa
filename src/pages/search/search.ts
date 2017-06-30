import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { canEnterIfAuthenticated } from '../../decorators';
import { SearchProvider } from './../../providers';
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
  feed$: Observable<ITweet[]>;
  fetching$: Observable<boolean>;
  page: number = 0;
  itemsToDisplay$ = new BehaviorSubject<number>(1);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
    public searchProvider: SearchProvider
  ) {
    // this.navCtrl.insert(this.navCtrl.length() - 1, 'HomePage');
  }

  ionViewDidLoad() {
    this.query = decodeURIComponent(this.navParams.get('query'));
    this.init();
  }

  init() {
    this.feed$ = this.searchProvider.getSearchPaginated$(this.query, this.itemsToDisplay$);
    this.fetching$ = this.searchProvider.isFetching$();

    const hasFeed = this.searchProvider.hasSearch(this.query);
    if (!hasFeed) {
      console.log('hasFeed', hasFeed)
      this.searchProvider
        .fetch$(this.query)
        .first()
        .subscribe(() => { }, error => console.log('feed error', error));
    }    
  }

  // searchFromInput(e) {
  //   this.appCtrl.getRootNav().push('SearchPage', { query: encodeURIComponent(this.searchTerm) });
  //   this.searchTerm = '';
  // }

  search(e) {
    this.init();
  }

  refresh(refresher: Refresher) {
    console.log('refresh')
    this.searchProvider
      .fetch$(this.query)
      .first()
      .finally(() => refresher.complete())
      .subscribe(() => { }, error => console.log('feed error', error));
  }

  loadMore(infiniteScroll: InfiniteScroll) {
    console.log('loadMore')
    let currentLength;
    this.feed$
      .first()
      .subscribe((items: ITweet[]) => (currentLength = items.length));

    if (this.searchProvider.searchLength(this.query) > currentLength) {
      this.nextPage();
      infiniteScroll.complete();
    } else {
      this.searchProvider
        .fetchNextPage$(this.query)
        .first()
        .finally(() => infiniteScroll.complete())
        .subscribe(
        () => this.nextPage(),
        error => console.log('feed error', error),
      );
    }
  }

  nextPage = (): void => {
    this.page += 1;
    this.itemsToDisplay$.next(this.page);
  };

}
