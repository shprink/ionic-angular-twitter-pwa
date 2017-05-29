import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NotificationsPage } from './notifications';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    NotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    SharedLazyModule,
  ],
  exports: [
    NotificationsPage
  ]
})
export class NotificationsPageModule {}
