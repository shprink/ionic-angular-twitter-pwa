import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessagesPage } from './messages';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesPage),
    SharedLazyModule,
  ],
  exports: [
    MessagesPage
  ]
})
export class MessagesPageModule {}
