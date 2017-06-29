import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ITweet } from './../../reducers';
import { TweetProvider } from './../../providers';
/**
 * Generated class for the TweetDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'status/:id'
})
@Component({
  selector: 'page-tweet-details',
  templateUrl: 'tweet-details.html',
})
export class TweetDetailsPage {
  tweet$: Observable<ITweet>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tweetProvider: TweetProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TweetDetailsPage');
    this.tweet$ = this.tweetProvider.getById$(this.navParams.get('id'));
  }

}
