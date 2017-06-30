import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { getTweetLength, extractMentionsOrListsWithIndices } from 'twitter-text';

import { tweetValidator } from './tweetValidator';
import { UsersProvider, TwitterProvider, TweetProvider } from './../../providers';
import { ITwitterUser, ITweet } from './../../reducers';
/**
 * Generated class for the TweetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: ''
})
@Component({
  selector: 'page-tweet',
  templateUrl: 'tweet.html',
})
export class TweetPage {
  replyingTo$: Observable<string>;
  username: string;
  in_reply_to_status_id: string;
  maxCharacter: number = 140;
  tweetForm: FormGroup;
  characterCount$: Observable<number>;
  user$: Observable<ITwitterUser>
  @ViewChild('textarea') textarea;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public twitterProvider: TwitterProvider,
    public tweetProvider: TweetProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private users: UsersProvider,
  ) {
    this.tweetForm = this.formBuilder.group({
      tweet: ['', [Validators.required, tweetValidator]],
    });
    this.characterCount$ = this.tweetForm.valueChanges
      .map(({ tweet }) => this.maxCharacter - getTweetLength(tweet));
  }

  ionViewDidLoad() {
    this.user$ = this.users.getCurrentUser$();
    this.in_reply_to_status_id = this.navParams.get('in_reply_to_status_id');
    this.username = this.navParams.get('username');
    if (this.in_reply_to_status_id && this.username) {
      this.replyingTo$ = this.tweetProvider.getById$(this.in_reply_to_status_id)
        .map((tweet: ITweet) => {
          const usernames = ['@' + this.username, ...extractMentionsOrListsWithIndices(tweet.text)
            .map(res => '@' + res.screenName)];
          let usernamesToString = usernames.join(' ');
          if (usernames.length > 1) {
            const lastUsername = usernames.splice(-1, 1);
            usernamesToString = usernames.join(' ') + ' & ' + lastUsername
          }
          return 'Replying to ' + usernamesToString;
        }
        );
    }
    // wait for the animation to finish before focus
    setTimeout(() => this.textarea.setFocus(), 400);
  }

  ionViewDidLeave() {

  }

  tweet() {
    let status = this.tweetForm.value.tweet;
    if (this.in_reply_to_status_id && this.username) {
      status = `@${this.username} ${status}`
    }
    this.twitterProvider.tweet(status, this.in_reply_to_status_id).subscribe(() => {
      this.toastCtrl.create({
        message: 'Tweet sent!',
        duration: 3000
      }).present();
      this.dismiss();
    }, () => {
      this.toastCtrl.create({
        message: 'Something wrong happened, please try again!',
        duration: 3000
      }).present();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
