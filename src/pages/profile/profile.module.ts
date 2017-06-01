import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilePage } from './profile';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    SharedLazyModule,
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfilePageModule {}
