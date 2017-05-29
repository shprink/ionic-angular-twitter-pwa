import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TweetPage } from './tweet';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    TweetPage,
  ],
  imports: [
    IonicPageModule.forChild(TweetPage),
    SharedLazyModule,
  ],
  exports: [
    TweetPage
  ]
})
export class TweetPageModule {}
