import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  InfiniteScroll, Refresher, Content
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
  afix: boolean = false;
  tab: string = 'tweets';
  handle: string;
  user: ITwitterUser;
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

  @ViewChild(Content) content: Content;
  @ViewChild('segmentWrapper') segmentWrapper: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usersProvider: UsersProvider,
    private userTweetsProvider: UserTweetsProvider,
    private userLikesProvider: UserLikesProvider,
    public zone: NgZone,
  ) {
  }

  ionViewDidLoad() {
    this.handle = this.navParams.get('handle');
    this.usersProvider.getUserById$(this.handle).subscribe(user => this.user = user);

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

  ngAfterViewInit() {
    this.content.ionScroll.subscribe(e => {
      const top = this.segmentWrapper.nativeElement.getBoundingClientRect().top;
      if (top <= 56 && !this.afix) {
        this.zone.run(()=> this.afix = true);
      } else if (top > 56 && this.afix) {
        this.zone.run(()=> this.afix = false);
      }
    });
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
