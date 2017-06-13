import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';
import { autoLinkWithJSON } from 'twitter-text';
import _get from 'lodash/get';

import { ITweet, ITweetEntitiesMedia } from './../../reducers';
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
  text: string;

  @Input() data: ITweet;

  constructor(public appCtrl: App) {
    console.log('Hello TweetComponent Component');
  }

  ngOnInit() {
    this.media = _get(this.data, 'entities.media[0]');

    this.text = autoLinkWithJSON(this.data.text, _get(this.data, 'entities'), {
      hashtagUrlBase: '#search/%23',
      usernameUrlBase: '#profile/',
    });
  }

  goToProfile = (id, handle) => {
    this.appCtrl.getRootNav().push('ProfilePage', {
      id: this.data.user.id,
      handle: this.data.user.screen_name,
    });
  };
}
