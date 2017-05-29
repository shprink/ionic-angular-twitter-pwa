import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FeedPage } from './feed';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    SharedLazyModule,
  ],
  exports: [
    FeedPage
  ]
})
export class FeedPageModule {}
