import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Injector } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  InfiniteScroll,
  Refresher,
} from 'ionic-angular';

import { canEnterIfAuthenticated } from '../../decorators';
import { FeedProvider, UsersProvider } from '../../providers';
import { ITweet } from './../../reducers';
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
  feed$: Observable<ITweet[]>;
  fetching$: Observable<boolean>;
  page: number = 0;
  itemsToDisplay$ = new BehaviorSubject<number>(1);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public feedProvider: FeedProvider,
    public usersProvider: UsersProvider,
    public injector: Injector,
  ) { }

  ionViewDidLoad() {
    this.feed$ = this.feedProvider.getFeedPaginated$(this.itemsToDisplay$);
    this.fetching$ = this.feedProvider.isFetching$();

    const hasFeed = this.feedProvider.hasFeed();
    if (!hasFeed) {
      console.log('init')
      this.feedProvider
        .fetch$()
        .first()
        .subscribe(() => { }, error => console.log('feed error', error));
    }
  }

  refresh(refresher: Refresher) {
    console.log('refresh')
    this.feedProvider
      .fetch$()
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

    console.log('loadMore', this.feedProvider.feedLength(), currentLength)
    if (this.feedProvider.feedLength() > currentLength) {
      this.nextPage();
      infiniteScroll.complete();
    } else {
      this.feedProvider
        .fetchNextPage$()
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
