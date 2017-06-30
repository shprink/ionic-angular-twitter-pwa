import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

import { MentionsProvider } from './../../providers';
import { canEnterIfAuthenticated } from '../../decorators';
import { ITweet } from './../../reducers';
/**
 * Generated class for the MentionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@canEnterIfAuthenticated
@IonicPage()
@Component({
  selector: 'page-mentions',
  templateUrl: 'mentions.html',
})
export class MentionsPage {
  feed$: Observable<ITweet[]>;
  fetching$: Observable<boolean>;
  page: number = 0;
  itemsToDisplay$ = new BehaviorSubject<number>(1);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public injector: Injector,
    public mentionsProvider: MentionsProvider,
  ) { }

  ionViewDidLoad() {
    this.feed$ = this.mentionsProvider.getMentionsPaginated$(this.itemsToDisplay$);
    this.fetching$ = this.mentionsProvider.isFetching$();

    const hasFeed = this.mentionsProvider.hasFeed();
    if (!hasFeed) {
      console.log('hasFeed', hasFeed)
      this.mentionsProvider
        .fetch$()
        .first()
        .subscribe(() => { }, error => console.log('feed error', error));
    }
  }

  refresh(refresher: Refresher) {
    console.log('refresh')
    this.mentionsProvider
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

    if (this.mentionsProvider.feedLength() > currentLength) {
      this.nextPage();
      infiniteScroll.complete();
    } else {
      this.mentionsProvider
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
