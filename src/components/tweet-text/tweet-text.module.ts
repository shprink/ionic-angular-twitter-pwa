import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TweetTextComponent } from './tweet-text';

@NgModule({
  declarations: [
    TweetTextComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    TweetTextComponent
  ]
})
export class TweetTextComponentModule {}
