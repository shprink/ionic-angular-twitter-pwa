import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InfiniteScroll, Refresher } from 'ionic-angular';

import { ITrendingHashtag } from './../../reducers';
/**
 * Generated class for the TrendingHashtagsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'trending-hashtags',
  templateUrl: 'trendingHashtags.html',
})
export class TrendingHashtagsComponent {
  @Input() content: ITrendingHashtag[] = [];
  @Input() isFetching: boolean;
  @Output() onRefresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  doRefresh(refresher: Refresher) {
    this.onRefresh.emit(refresher);
  }

  doClick(hashtag: ITrendingHashtag) {
    this.onClick.emit(hashtag);
  }

  trackById(index, item) {
    return item.id;
  }
}
