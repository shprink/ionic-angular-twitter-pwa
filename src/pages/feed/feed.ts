import { Observable } from 'rxjs/Observable';
import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public feedProvider: FeedProvider,
    public usersProvider: UsersProvider,
    public injector: Injector,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this.feed$ = this.feedProvider.getFeed$();
  }

  init() {
    const hasFeed = this.feedProvider.hasFeed();
    if (!hasFeed) {
      this.feedProvider.reset().first().subscribe(
        () => { },
        error => console.log('feed error', error)
      );
    }
  }

  refresh(refresher: Refresher) {
    this.feedProvider.reset().first().subscribe(
      () => { },
      error => console.log('feed error', error),
      () => refresher.complete()
    );
  }

  loadMore(infiniteScroll: InfiniteScroll) {
    this.feedProvider.getNextPage().first().subscribe(
      () => { },
      error => console.log('feed error', error),
      () => infiniteScroll.complete()
    );
  }
}
