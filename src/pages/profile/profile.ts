import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  InfiniteScroll, Refresher,
} from 'ionic-angular';

import { ITwitterUser, ITweet } from './../../reducers';
import { UsersProvider, UserTweetsProvider, UserLikesProvider } from './../../providers';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'profile/:handle'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  tab: string = 'tweets';
  handle: string;
  user$: Observable<ITwitterUser>;
  // tweets
  tweets$: Observable<ITweet[]>;
  tweetsFetching$: Observable<boolean>;
  tweetsPage: number = 0;
  tweetsItemsToDisplay$ = new BehaviorSubject<number>(1);
  // likes
  likes$: Observable<ITweet[]>;
  likesFetching$: Observable<boolean>;
  likesPage: number = 0;
  likesItemsToDisplay$ = new BehaviorSubject<number>(1);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usersProvider: UsersProvider,
    private userTweetsProvider: UserTweetsProvider,
    private userLikesProvider: UserLikesProvider,
  ) {
  }

  ionViewDidLoad() {
    this.handle = this.navParams.get('handle');
    this.user$ = this.usersProvider.getUserById$(this.handle);

    if (!this.usersProvider.doesUserExist(this.handle)) {
      this.usersProvider.fetchUser$(this.handle)
        .first()
        .subscribe(() => { }, error => console.log('fetchUser error', error));
    }

    this.tweets$ = this.userTweetsProvider.getUserTweetsPaginated$(this.handle, this.tweetsItemsToDisplay$);
    this.tweetsFetching$ = this.userTweetsProvider.isFetching$();

    this.likes$ = this.userLikesProvider.getUserLikesPaginated$(this.handle, this.likesItemsToDisplay$);
    this.likesFetching$ = this.userLikesProvider.isFetching$();

    this.init();
  }

  init(selectedSegment = this.tab) {
    selectedSegment === 'tweets' ? this.initTweets() : this.initLikes();
  }

  initTweets() {
    const hasFeed = this.userTweetsProvider.hasUserTweets(this.handle);
    if (!hasFeed) {
      console.log('init userTweetsProvider')
      this.userTweetsProvider
        .fetch$(this.handle)
        .first()
        .subscribe(() => { }, error => console.log('feed error', error));
    }
  }

  refreshTweets(refresher: Refresher) {
    console.log('refreshTweets')
    this.userTweetsProvider
      .fetch$(this.handle)
      .first()
      .finally(() => refresher.complete())
      .subscribe(() => { }, error => console.log('feed error', error));
  }

  loadMoreTweets(infiniteScroll: InfiniteScroll) {
    console.log('loadMoreTweets')
    let currentLength;
    this.tweets$.first().subscribe((items: ITweet[]) => (currentLength = items.length));

    if (this.userTweetsProvider.userTweetsLength() > currentLength) {
      this.nextTweetsPage();
      infiniteScroll.complete();
    } else {
      this.userTweetsProvider
        .fetchNextPage$(this.handle)
        .first()
        .finally(() => infiniteScroll.complete())
        .subscribe(
        () => this.nextTweetsPage(),
        error => console.log('feed error', error),
      );
    }
  }

  nextTweetsPage = (): void => {
    this.tweetsPage += 1;
    this.tweetsItemsToDisplay$.next(this.tweetsPage);
  };

  initLikes() {
    const hasFeed = this.userLikesProvider.hasUserLikes(this.handle);
    if (!hasFeed) {
      console.log('init userLikesProvider')
      this.userLikesProvider
        .fetch$(this.handle)
        .first()
        .subscribe(() => { }, error => console.log('feed error', error));
    }
  }

  refreshLikes(refresher: Refresher) {
    console.log('refreshLikes')
    this.userLikesProvider
      .fetch$(this.handle)
      .first()
      .finally(() => refresher.complete())
      .subscribe(() => { }, error => console.log('feed error', error));
  }

  loadMoreLikes(infiniteScroll: InfiniteScroll) {
    console.log('loadMoreLikes')
    let currentLength;
    this.tweets$.first().subscribe((items: ITweet[]) => (currentLength = items.length));

    if (this.userLikesProvider.userLikesLength() > currentLength) {
      this.nextLikesPage();
      infiniteScroll.complete();
    } else {
      this.userLikesProvider
        .fetchNextPage$(this.handle)
        .first()
        .finally(() => infiniteScroll.complete())
        .subscribe(
        () => this.nextLikesPage(),
        error => console.log('feed error', error),
      );
    }
  }

  nextLikesPage = (): void => {
    this.likesPage += 1;
    this.likesItemsToDisplay$.next(this.likesPage);
  };

  changeTab({ value }) {
    this.init(value);
  }

}
