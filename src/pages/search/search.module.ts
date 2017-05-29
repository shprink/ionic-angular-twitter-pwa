import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SearchPage } from './search';
import { SharedLazyModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    SharedLazyModule,
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule {}
