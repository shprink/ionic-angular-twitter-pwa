import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { AvatarComponent } from '../components/avatar/avatar';
import { TweetFabComponent } from '../components/tweet-fab/tweet-fab';
import { MessageFabComponent } from '../components/message-fab/message-fab';
import { AvatarToolbarComponent } from '../components/avatar-toolbar/avatar-toolbar';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        AvatarComponent,
        AvatarToolbarComponent,
        TweetFabComponent,
        MessageFabComponent,
    ],
    exports: [
        AvatarComponent,
        AvatarToolbarComponent,
        TweetFabComponent,
        MessageFabComponent,
    ]
})
export class SharedLazyModule { }