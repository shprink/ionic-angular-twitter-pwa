import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TweetDetailsPage } from './tweet-details';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    TweetDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TweetDetailsPage),
    SharedLazyModule,
  ],
  exports: [
    TweetDetailsPage
  ]
})
export class TweetDetailsPageModule { }
