import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MentionsPage } from './mentions';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MentionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MentionsPage),
    SharedLazyModule,
  ],
  exports: [
    MentionsPage
  ]
})
export class MentionsPageModule {}
