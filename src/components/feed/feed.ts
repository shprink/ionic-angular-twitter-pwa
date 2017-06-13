import { ITweet } from './../../reducers/feed';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InfiniteScroll, Refresher } from 'ionic-angular';

import { FeedProvider } from './../../providers';
/**
 * Generated class for the FeedComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'feed',
  templateUrl: 'feed.html',
})
export class FeedComponent {
  @Input() content: ITweet[];
  @Input() isFetching: boolean;
  @Output() onInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInfinite: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRefresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(private feed: FeedProvider) {}

  ngOnInit() {
    this.onInit.emit();
  }

  doRefresh(refresher: Refresher) {
    this.onRefresh.emit(refresher);
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.onInfinite.emit(infiniteScroll);
  }

  trackById(index, item) {
    return item.id;
  }
}
