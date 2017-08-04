import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { autoLinkWithJSON, autoLink } from 'twitter-text';
import { App } from 'ionic-angular';

import { ITweetEntities } from './../../reducers/tweets';
/**
 * Generated class for the TweetTextComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tweet-text',
  templateUrl: 'tweet-text.html'
})
export class TweetTextComponent {
  @Input() text: string;
  @Input() entities: ITweetEntities;
  @ViewChild('TweetContent') tweetContent: ElementRef;
  options = {
    hashtagUrlBase: `javascript:void(0);`,
    usernameUrlBase: `javascript:void(0);`,
  }

  constructor(
    public appCtrl: App,
  ) { }

  ngOnChanges(changes: any) {
    if (changes.text && changes.text.currentValue && this.tweetContent && changes.text.currentValue !== changes.text.previousValue) {
      this.text = this.entities
        ? autoLinkWithJSON(this.text, this.entities || {}, this.options)
        : autoLink(this.text, this.options);
      this.tweetContent.nativeElement.innerHTML = this.text;
      const links = this.tweetContent.nativeElement.querySelectorAll('a');

      [].forEach.call(links, a => {
        if (a.classList.contains('username')) {
          a.onclick = e => this.goToProfile(e, a.innerText);
        } else if (a.classList.contains('hashtag')) {
          a.onclick = e => this.goToSearch(e, a.innerText);
        } else {
          a.onclick = e => this.openLink(e, a.getAttribute('href'));
        }
      });
    }
  }

  openLink(e, url) {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank');
  };

  goToProfile(e, handle) {
    e.preventDefault();
    e.stopPropagation();
    this.appCtrl.getRootNav().push('ProfilePage', { handle });
  };

  goToSearch(e, searchTerm) {
    e.preventDefault();
    e.stopPropagation();
    this.appCtrl.getRootNav().push('SearchPage', { query: encodeURIComponent(searchTerm) });
  };

}
