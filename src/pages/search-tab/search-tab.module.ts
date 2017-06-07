import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SearchTabPage } from './search-tab';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    SearchTabPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchTabPage),
    SharedLazyModule,
  ],
  exports: [
    SearchTabPage
  ]
})
export class SearchTabPageModule {}
