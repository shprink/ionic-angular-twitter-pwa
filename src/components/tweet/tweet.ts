import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';
import { autoLinkWithJSON } from 'twitter-text';
import javascript_time_ago from 'javascript-time-ago'
import _get from 'lodash/get';

import { ITweet, ITweetEntitiesMedia } from './../../reducers';
import { TweetProvider } from './../../providers';

javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
const time_ago = new javascript_time_ago('en');
/**
 * Generated class for the TweetComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tweet',
  templateUrl: 'tweet.html',
})
export class TweetComponent {
  media: ITweetEntitiesMedia;
  timeAgo: string;
  text: string;

  @Input() data: ITweet;

  constructor(
    public appCtrl: App,
    public tweetProvider: TweetProvider,
  ) {
    console.log('Hello TweetComponent Component');
  }

  ngOnInit() {
    this.media = _get(this.data, 'entities.media[0]');
    this.text = autoLinkWithJSON(this.data.text, _get(this.data, 'entities'), {
      hashtagUrlBase: `#/nav/${this.appCtrl.getRootNav().id}/search/%23`,
      usernameUrlBase: `#/nav/${this.appCtrl.getRootNav().id}/profile/`,
    });
    this.timeAgo = time_ago.format(new Date(this.data.created_at));
  }

  goToProfile = (id, handle) => {
    this.appCtrl.getRootNav().push('ProfilePage', {
      id: this.data.user.id,
      handle: this.data.user.screen_name,
    });
  };

  retweet() {
    return this.tweetProvider.retweet$(!this.data.retweeted, this.data.id_str).subscribe()
  }

  favorite() {
    return this.tweetProvider.favorite$(!this.data.favorited, this.data.id_str).subscribe()
  }
}
