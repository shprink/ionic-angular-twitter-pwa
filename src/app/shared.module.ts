import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { AvatarComponent } from '../components/avatar/avatar';
import { TweetFabComponent } from '../components/tweet-fab/tweet-fab';
import { MessageFabComponent } from '../components/message-fab/message-fab';
import { AvatarToolbarComponent } from '../components/avatar-toolbar/avatar-toolbar';
import { ProfileHeaderComponent } from '../components/profile-header/profile-header';

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
        ProfileHeaderComponent,
    ],
    exports: [
        AvatarComponent,
        AvatarToolbarComponent,
        TweetFabComponent,
        MessageFabComponent,
        ProfileHeaderComponent,
    ]
})
export class SharedLazyModule { }