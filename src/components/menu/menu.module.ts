import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuComponent } from './menu';

import { CoverComponent } from '../cover/cover';

@NgModule({
  declarations: [
    MenuComponent,
    CoverComponent,
  ],
  imports: [
    IonicPageModule.forChild(MenuComponent),
  ],
  exports: [
    MenuComponent,
    CoverComponent
  ]
})
export class MenuComponentModule { }
