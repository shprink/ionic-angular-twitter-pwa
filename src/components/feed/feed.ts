import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { InfiniteScroll, Refresher } from 'ionic-angular';

import { ITweet } from './../../reducers';
/**
 * Generated class for the FeedComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'feed',
  templateUrl: 'feed.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {
  @Input() addRefresher: boolean = true;
  @Input() content: ITweet[];
  @Input() isFetching: boolean;
  @Output() onInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInfinite: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRefresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) {}

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
    return item.id_str;
  }
}
